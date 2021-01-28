const baseUrl = `https://localhost:5001/`;

const getFiltersUrl = () => `${baseUrl}accident/filterflags`;

const getStateData = (state, startDate, endDate) => `${baseUrl}accident/state/${state}?startDate=${startDate.toJSON()}&endDate=${endDate.toJSON()}`;

const getCoronaUrl = (startDate, endDate) => `${baseUrl}corona?startDate=${startDate.toJSON()}&endDate=${endDate.toJSON()}`;

export {getFiltersUrl, getStateData, getCoronaUrl};