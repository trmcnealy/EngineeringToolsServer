
import {Emitter, AppEvent} from "./Events";
import {LayoutItem} from "./LayoutItem";

export class DashboardState {

    Panels: Array<LayoutItem>;
    Events: Emitter;

    constructor(data?: any) {
        if (!data) {
            data = {};
        }

        this.Events = new Emitter();

        if (data.Panels) {
            this.Panels = data.Panels.map((panelData: any) => new LayoutItem(panelData));
        } else {
            this.Panels = new Array<LayoutItem>();
        }

        this.sortPanelsByGridPos();
    }

    render() {
        for (const panel of this.Panels) {
            panel.render();
        }
    }

    forEachPanel(callback: (panel: LayoutItem, index: number) => void) {
        for (let i = 0; i < this.Panels.length; i++) {
            callback(this.Panels[i], i);
        }
    }

    sortPanelsByGridPos() {
        if (this.Panels.length > 1) {
            this.Panels.sort((panelA, panelB) => {
                if (panelA.state.gridPos.y === panelB.state.gridPos.y) {
                    return panelA.state.gridPos.x - panelB.state.gridPos.x;
                } else {
                    return panelA.state.gridPos.y - panelB.state.gridPos.y;
                }
            });
        }
    }

    getNextPanelId() {
        let max = 0;

        for (const panel of this.Panels) {
            if (panel.props.id > max) {
                max = panel.props.id;
            }
        }

        return max + 1;
    }

    addPanel(panelData: any) {
        panelData.id = this.getNextPanelId();

        const panel = new LayoutItem(panelData);

        this.Panels.unshift(panel);

        this.sortPanelsByGridPos();

        //this.Events.emit(panelAdded, panel);
    }

    removePanel(panel: LayoutItem) {
        const index = this.Panels.indexOf(panel);
        this.Panels.splice(index, 1);
        //this.Events.emit(panelRemoved, panel);
    }

    destroy() {
        this.Events.removeAllListeners();
        for (const panel of this.Panels) {
            panel.destroy();
        }
    }

    on<T>(event: AppEvent<T>, callback: (payload?: T) => void) {
        this.Events.on(event, callback);
    }

    off<T>(event: AppEvent<T>, callback: (payload?: T) => void) {
        this.Events.off(event, callback);
    }
}
