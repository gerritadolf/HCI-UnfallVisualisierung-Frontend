const baseUrl = `https://localhost:5001/accident/`;

const getFiltersUrl = () => `${baseUrl}filterflags`;

const getStateData = (state, startDate, endDate) => `${baseUrl}state/${state}?startDate=${startDate.toJSON()}&endDate=${endDate.toJSON()}`;

export {getFiltersUrl, getStateData};