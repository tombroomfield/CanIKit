import { ClientGlob } from "../types/app";
import { PolicyList } from "../types/app";
export default class LayoutManager {
    path: string;
    layoutServers: ClientGlob;
    layoutPolicies: ClientGlob;
    constructor({ path, layoutServers, layoutPolicies, }: {
        path: string;
        layoutServers: ClientGlob;
        layoutPolicies: ClientGlob;
    });
    ensureServersHavePolicies(): void;
    ancestorPolicies(): PolicyList;
    ancestorsServers(): any;
}
