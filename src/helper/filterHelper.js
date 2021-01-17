import {getFiltersUrl} from "./urlHelper";

let availableFilters = null;

const getAvailableFilters = () => {
    return new Promise(async (resolve) => {
        if (availableFilters === null) {
            const response = await fetch(getFiltersUrl());
            const json = await response.json();
            availableFilters = json;
        }
        resolve(availableFilters);
    })
}

export {getAvailableFilters};