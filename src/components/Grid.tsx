import * as React from "react"
import { Layout, Responsive, WidthProvider } from "react-grid-layout"

import "@styles/grid.css"
import embed from "vega-embed"
import { TopLevelSpec } from "vega-lite"

export function MyGrid() {
  const layout: Layout[] = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 2, h: 2 },
    { i: "c", x: 0, y: 1, w: 1, h: 2 }
  ]

  const elements: string[] = ["a", "b", "c"]

  const ResponsiveGridLayout = WidthProvider(Responsive)

  const handleResize = () => window.dispatchEvent(new Event("resize"))

  return (
    <ResponsiveGridLayout
      className="layout w-full h-full"
      compactType="horizontal"
      layouts={{ md: layout, lg: layout }}
      cols={{ md: 8, lg: 12 }}
      onResize={handleResize}
      onResizeStop={() => setTimeout(handleResize, 200)}
      rowHeight={50}>
      {elements.map((s: string) => (
        <div
          key={s}
          className="w-full h-full bg-neutral p-2 text-neutral-content shadow">
          <div className="w-full h-full">
            <GridContent title={s} />
          </div>
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}

export const GridContent: React.FC<{ title: string }> = (props) => {
  const myRef = React.createRef<HTMLDivElement>()

  const vegaLiteSpec: TopLevelSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: {
      values: [
        { a: "A", b: 28 },
        { a: "B", b: 55 },
        { a: "C", b: 43 },
        { a: "D", b: 91 },
        { a: "E", b: 81 },
        { a: "F", b: 53 },
        { a: "G", b: 19 },
        { a: "H", b: 87 },
        { a: "I", b: 52 }
      ]
    },
    mark: "bar",
    encoding: {
      x: { field: "a", type: "nominal", axis: { labelAngle: 0 } },
      y: { field: "b", type: "quantitative" }
    },
    width: "container",
    height: "container"
  }

  const init = React.useEffect(() => {
    embed(myRef.current!, vegaLiteSpec, { actions: false, renderer: "svg" })
  }, [])

  return <div ref={myRef} className="w-full h-full"></div>
}
