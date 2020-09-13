import React from "react";
import {WidthProvider, Responsive} from "react-grid-layout";
import ReactDOM from "react-dom";

//import GridLayout from "react-grid-layout";
import "../css/Dashboard.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class MyFirstGrid extends React.PureComponent {
    static defaultProps = {
        onLayoutChange: function () {},
        cols: {lg: 48, md: 40, sm: 20, xs: 16, xxs: 8},
        rowHeight: 30
    };

    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    i: "n0",
                    x: 0,
                    y: 0,
                    w: 10,
                    h: 10
                }
            ]
        };

        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
    }

    static SUBROWS_PER_VISIBLE_ROW = 10;

    static DASHBOARD_ROW_HEIGHT = 20;

    //state = {
    //    width: 1200,
    //    height: 800
    //};

    componentDidMount() {
        this.mounted = true;

        //window.addEventListener("resize", this.onWindowResize);

        //this.onWindowResize();
    }

    //onWindowResize = () => {
    //    if (!this.mounted) {
    //        return;
    //    }

    //    const node = ReactDOM.findDOMNode(this);

    //    if (node instanceof HTMLElement) {
    //        this.setState({
    //            width: node.offsetWidth,
    //            height: node.offsetHeight
    //        });
    //    }
    //};

    createElement(el) {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
        };

        const i = el.i;

        console.log("createElement", `${i}`);

        return (
            <div key={i} data-grid={el}>
                <span className="text">{i}</span>
                <span className="chart-dropdown-button" style={removeStyle} onClick={this.onRemoveItem.bind(this, i)}>
                    x
                </span>
            </div>
        );
    }

    onAddItem() {
        console.log("adding", `n${this.state.items.length}`);

        this.setState({
            items: this.state.items.concat({
                i: `n${this.state.items.length}`,
                x: (this.state.items.length * 2) % (this.state.cols || 12),
                y: Infinity,
                w: 2,
                h: 2
            })
        });
    }

    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
        this.setState({layout: layout});
    }

    onRemoveItem(i) {
        console.log("removing", i);

        const index = this.state.items.indexOf({i: i});

        delete this.state.items[index];

        this.setState({items: this.state.items});
    }

    render() {
        console.log(this);

        return (
            <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange} onBreakpointChange={this.onBreakpointChange} {...this.props}>
                {this.state.items.map((el) => this.createElement(el))}
            </ResponsiveReactGridLayout>
        );

        //return (
        //    <GridLayout id="dashboard" className="react-grid-layout" cols={this.getNumColumns()} rowHeight={MyFirstGrid.DASHBOARD_ROW_HEIGHT} width={this.state.width}>
        //        <div key="a" data-grid={this.getLayouts("a")}>a</div>
        //        <div key="b" data-grid={this.getLayouts("b")}>b</div>
        //        <div key="c" data-grid={this.getLayouts("c")}>c</div>
        //    </GridLayout>
        //);
    }

    //getLayouts(id) {
    //    switch (id) {
    //        case "a":
    //        {
    //            return {
    //                i: "a",
    //                x: 0,
    //                y: 4,
    //                w: 4,
    //                h: 4,

    //                minW: 2,
    //                maxW: this.getNumColumns(),
    //                minH: 2,
    //                maxH: this.getNumRows(),

    //                static: false,
    //                isDraggable: true,
    //                isResizable: true
    //            };
    //        }
    //        case "b":
    //        {
    //            return {
    //                i: "b",
    //                x: 4,
    //                y: 0,
    //                w: 4,
    //                h: 4,

    //                minW: 2,
    //                maxW: this.getNumColumns(),
    //                minH: 2,
    //                maxH: this.getNumRows(),

    //                static: false,
    //                isDraggable: true,
    //                isResizable: true
    //            };
    //        }
    //        case "c":
    //        {
    //            return {
    //                i: "c",
    //                x: 8,
    //                y: 0,
    //                w: 4,
    //                h: 4,

    //                minW: 2,
    //                maxW: this.getNumColumns(),
    //                minH: 2,
    //                maxH: this.getNumRows(),

    //                static: false,
    //                isDraggable: true,
    //                isResizable: true
    //            };
    //        }
    //    }
    //    return null;
    //}

    //getNumRows() {
    //    return Math.floor(this.state.height / MyFirstGrid.DASHBOARD_ROW_HEIGHT);
    //}

    //getNumColumns() {
    //    return Math.floor((this.state.width / this.state.height) * this.getNumRows());
    //}
}
