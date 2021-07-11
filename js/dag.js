function renderDAG() {
  (async () => {
      let params = new URLSearchParams(window.location.search.slice(1));
      let baseID = params.get('base-id')
      let apiKey = params.get('api-key')
      let language = params.get('language')

      // fetch data and render
      const resp = await fetch(`https://api.airtable.com/v0/${baseID}/People?api_key=${apiKey}&sort%5B0%5D%5Bfield%5D=Ordering&sort%5B0%5D%5Bdirection%5D=asc`);

      const records = await resp.json();

      const data = records.records.map(record => 
        ({
          id: record.id,
          parents: (record.fields.Parents ?? []).sort(),
          children: (record.fields.Children ?? []).sort(),
          partners: (record.fields.Partners ?? []).sort(),
          name: record.fields.Name,
          image: 'Photo' in record.fields ? record.fields.Photo[0].url : null,
          birthDate: record.fields["Birth Date"],
          gender: record.fields.Gender,
          languages: record.fields.Languages
        })
      );

      const dataByID = data.reduce((dataByID, record) => {
        dataByID[record.id] = record
        return dataByID
      }, {});

      function uniq(a) {
        let seen = new Set();
        return a.filter(item => {
          let k = item.id;
        return seen.has(k) ? false : seen.add(k);
        });
      }

      function merge(objects) {
        return objects.reduce((merged, object) => {
          var seen = merged[object.id]
          if(seen) {
            if(seen.isUnion) {
              merged[object.id] = {
                id: object.id,
                parentIds: seen.parentIds,
                name: null,
                image: null,
                isUnion: true,
                hasChildren: seen.hasChildren || object.hasChildren
              }
            }
          } else {
            merged[object.id] = object
          }
          return merged
        }, {}) 
      }

      const allLinks = data.reduce((strat, record) => {
        if (record.parents.length > 0) {
          strat.push({
            id: "u" + record.parents.join(""),
            parentIds: record.parents,
            isUnion: true,
            hasChildren: true
          })
        } else if (record.partners.length > 0) {
          const union = record.partners.concat(record.id).sort()
          strat.push({
            id: "u" + union.join(""),
            parentIds: union,
            isUnion: true,
            hasChildren: record.children.length > 0
          })
        }

        strat.push({ 
          id: record.id, 
          parentIds: record.parents.length > 0 ? ["u" + record.parents.join("")] : [],
          name: record.name, 
          image: record.image 
        })
        return strat
      }, []);

      const merged = merge(allLinks)

      strat = uniq(Object.values(merged))

      var adjList = data.reduce((adjList, record) => {
        adjList[record.id] = record.partners.concat(record.parents).concat(record.children)
        return adjList
      }, {})

      const dag = d3.dagStratify()(strat);
      const nodeRadius = 80;
      const layout = d3
        .sugiyama()
        .decross(d3.decrossOpt())
        .nodeSize((node) => [(node ? 3.6 : 0.25) * nodeRadius, 3 * nodeRadius]); // set node size instead of constraining to fit
      const { width, height } = layout(dag);

      // --------------------------------
      // This code only handles rendering
      // --------------------------------

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('s')
        .offset([10, 0])
        .html((_, d) => {
          var relation = null
          console.log(d.data.id);
          if (d.data.isUnion) return;
          
          var content = `<span style='margin-left: 2.5px;'><b> ${d.data.name} </b></span><br>`

          const selectedRelationships = relationships[selectedID]
         
          if (selectedRelationships) {
            const relationship = selectedRelationships[d.data.id]
            relation = definitions[language][relationship.key] + (relationship.fallback ?? "")
            content += `<span style='margin-left: 2.5px;'><b> ${relation} </b></span><br>`
          }

          return content.replace(new RegExp("null", "g"), "")
        });

      var unionMidpoints = []

      const line = d3
        .line()
        .curve(d3.curveCatmullRom)
        .x((d) => d.x)
        .y((d) => d.y);


      function linkPath(s, d) {
        path = `
        M${s.x},${s.y}
        L${d.x},${s.y}
          L${d.x},${d.y}
        `
        return path
      }

      function unionPath(s, d) {
        path = `
          M${s.x},${s.y}
          L${d.x},${s.y}
        `
        return path
      }

      function zoomed({ transform }) {
        paths.attr("transform", transform);
        d3.select(".nodes").attr("transform", transform);
        d3.select(".union-nodes").attr("transform", transform)
      }

      const svgSelection = d3.select("svg");
      svgSelection
      .attr("viewBox", [0, 0, width, height]
      .join(" "))
      .call(d3.zoom().on("zoom", zoomed))
      .on("dblclick.zoom", null)
      .call(tip)
      const defs = svgSelection.append("defs");

      // Plot edges
      const paths = svgSelection
        .append("g")
        .selectAll("path")
        .data(dag.links())
        .enter()
        .append("path")
        .attr("d", (d) => {  
          if (d.target.data.isUnion && d.target.data.parentIds.length > 1) {
            unionMidpoints.push({ id: d.target.data.id, x: d.target.x, y: d.source.y })
          }

          if (d.target.data.isUnion && !d.target.data.hasChildren) {
             return unionPath(d.source, d.target)
          } else {
            return linkPath(d.source, d.target)
          }
        })
        .attr("fill", "none")
        .attr("stroke-width", 4)
        .attr("stroke-linejoin", "round")
        .attr("stroke", "black");
    
      // Plot node circles

      // Select nodes
      const nodes = svgSelection
        .append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(dag.descendants())
        .enter()
        .append("g")
        .attr("transform", ({ x, y }) => `translate(${x}, ${y})`)

      nodes
        .append("circle")
        .attr("r", nodeRadius)
        .attr("stroke-width", (d) => d.data.isUnion ? 0 : 4)
        .attr("stroke", "black")
        .attr("fill", (d) => {
          defs
          .append("pattern")
            .attr("id", d.data.id)
            .attr('height', '1')
            .attr('width', '1')
          .append("image")
            .attr("xlink:href", d.data.isUnion ? null : (d.data.image ?? "/fallback.png"))
            .attr("width", nodeRadius * 2)
            .attr("height", nodeRadius * 2)
            .attr("x", 0)
            .attr("y", 0);

          return `url(#${d.data.id})`
        });

      // --------------------------------
      // Interactivity
      // --------------------------------
        var selectedID = null
        var relationships = {}

        function singleSelectClassOn(_this, node) {
          d3.selectAll(`.${node}`).classed(node, false);
          d3.select(_this).classed(node, true);
        }

        d3.selectAll("circle")
          .on('mouseover', (_, d) => {
            if (d.data && !d.data.isUnion) {
              tip.show(_, d, selectedID);
            }
          })
          .on('mouseout', tip.hide)
          .on('click', function (_, d) {
            if (d.data.isUnion) { return }
            selectedID = d.data.id
            if (!relationships[d.data.id]) {
              relationships[d.data.id] = getRelationships(dataByID, adjList, d.data.id, language)
            }
            singleSelectClassOn(this, "source")
            tip.show(_, d, selectedID);

          })
    })();
}