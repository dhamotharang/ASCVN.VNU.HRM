export interface IMenuSidebar {
    css?: string;
    cssBadge?: string;
    title?: string;
    shortName?: string;
    link?: string;
    types?: string;
    isActive: boolean;
    subMenu?: IMenuSidebar[];
    options?: IKeyOption[]; 
}

export interface IKeyOption {
    key: string;
    title: string;
}
