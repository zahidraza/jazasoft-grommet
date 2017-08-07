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

