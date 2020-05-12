export const mergeObject=(changes)=>(object)=>({...object,...changes});

export const prepareWithoutEmptyKeys=(object)=>Object.fromEntries(Object.entries(object).filter(([key, value]) => value!==''));
