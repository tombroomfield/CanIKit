import { ClientGlob } from "../types/app";
import { SvelteKitError } from "../types/request";
import { PolicyList } from "../types/app";
export default class LayoutManager {
    path: string;
    layoutServers: ClientGlob;
    layoutPolicies: ClientGlob;
    error: SvelteKitError;
    constructor({ path, layoutServers, layoutPolicies, error, }: {
        path: string;
        layoutServers: ClientGlob;
        layoutPolicies: ClientGlob;
        error: SvelteKitError;
    });
    ensureServersHavePolicies(): void;
    ancestorPolicies(): PolicyList;
    ancestorsServers(): any;
}
