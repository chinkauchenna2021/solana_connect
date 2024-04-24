const CONNECTION_TIMEOUT = 1000;

export  async function  awaitLoading(milliseconds:number){
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
      });
}