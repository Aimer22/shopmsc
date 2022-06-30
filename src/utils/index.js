// 对象黑名单api
export const pick = ( obj, exclude=[] ) => {
    const newObj = {};
    for(let key in obj){
      if( !exclude.includes(key) ){
        newObj[key] = obj[key]
      }
    }
    return newObj;
  }

  export const findParentPath = ( arr, path ) => {
    if ( !arr.length ) return;
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (item.path === path) {
        return [{name: item.name }];
      } else {
        let children = item.children;
        if ( children ) {
          let res = findParentPath( children, path );
          if (res !== undefined) {
            res.unshift({name: item.name, path: item.path || '/'});
            return res;
          }
        }
      }
    }
  }

  
export const uuid = () => {
  return Date.now(); //1237218732
}

export const date = ( stamp ) => {
  let d1 = stamp ? new Date( stamp ): new Date();
  return d1.getFullYear() + '-' + (d1.getMonth()+1) + '-' + d1.getDate();
}