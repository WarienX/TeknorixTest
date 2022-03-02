import { JobDepartment } from "./departments";
import { JobFunction } from "./jobfunctions";
import { JobLocation } from "./locations";

export interface Jobs {
    id: number;
    code: string;
    title: string;
    description: string;
    industry: string;
    postedDate: string;
    closingDate?: string;
    attributes?: any[];
    location: JobLocation;
    department: JobDepartment;
    division?: any[];
    function: JobFunction;
    type: string;
    positions: number;
    experience?: string;
    salary?: string;
    hostedUrl?: string;
    applyUrl?: string;
    slug?: string;
    company?: string;
}