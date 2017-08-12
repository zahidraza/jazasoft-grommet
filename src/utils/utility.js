/**
 * @return {Array}  returns array of roles
 */
export const getRoles = () => {
  if (sessionStorage.authorities) {
    const authorities = JSON.parse(sessionStorage.authorities);
    return authorities.map(a => a.authority);
  }
  return [];
}

export function capitalize(param) {
  return param.charAt(0).toUpperCase() + param.slice(1);
}

export function splitCamelCase(param) {
  let result = param.charAt(0).toUpperCase() + param.slice(1);
  result = result.replace(/([A-Z])/g, ' $1').slice(1);
  return result;
}

export function getArrayFromCsv(csv) {
  if (csv == undefined) return [];
  return csv.split(/\s*,\s*/);
}

export function getCsvFromArray (list) {
  let csv = '';
  list.forEach(l => csv += l + ',');
  if (csv.length > 0) {
    csv = csv.substr(0, csv.length-1);
  }
  return csv;
}

export function getCollectionData(collectionData) {
  let collections = [];
  collectionData.forEach((cData) => {
    const collection = cData.map(p => {
      const {data, ...restData} = p;
      let dynamicData = {};
      data.forEach((d,i) => {
        if (i == 0) {
          dynamicData[d.name] = d.label;
        } else {
          dynamicData[d.name] = d.value;
        }
      });
      return {...restData, ...dynamicData};
    });
    collections.push(collection);
  });
  return collections;
}

export function normalise (list) {
  let object = {};
  list.forEach((o) => {
    object[o.id] = o;
  });
  return object;
}

export function denormalise(object) {
  let list = [];
  for (let key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      list.push(object[key]);
    }
  }
  return list;
}

