const original_consolelog = (str = undefined, any = undefined) => {
    str && any && console.log(str, any)
    console.log("--------------------------------------");
}

export default original_consolelog;
