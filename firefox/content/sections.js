class Sections {
  constructor(nodes,conf) {
    [this.nodes,this.conf] = [nodes,conf];
  }
  [Symbol.asyncIterator]() {
    let index = 0;
    return {
      next:async () => {
        const { section,gallery } = this.conf;
        if(index>=this.nodes.length) return { done:true }; else {
          const el = this.nodes[index++];
          Section.locate(el,section); await defer();
          return { done:false, value:{
            ...new Section(el,section), photos:await Section.photos(
                el.querySelectorAll(section.thumbnail),gallery
              )
            }
          };
        }
      }
    };
  }
}
