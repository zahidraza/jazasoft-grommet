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

