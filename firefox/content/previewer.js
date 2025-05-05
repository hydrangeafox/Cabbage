class Previewer {
  constructor(nodes,gallery) {
    [this.nodes,this.gallery] = [nodes,gallery];
  }
  head() {
    return this.nodes[0];
  }
  control(done) {
    const { container,next,close } = this.gallery;
    return document.querySelector(container)
                  ?.querySelector(done ? close : next);
  }
  [Symbol.asyncIterator]() {
    let index = 0;
    return {
      next:async () => {
        const done = index>=this.nodes.length;
        (done||index++ ? this.control(done) : this.head())?.click();
        await defer(); return {
          done, value:done ? undefined : new Photo(this.gallery)
        };
      }
    };
  }
}
