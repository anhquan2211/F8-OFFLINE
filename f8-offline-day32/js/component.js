/** @format */

class F8 {
  constructor() {}

  static component(name, options) {
    class CustomElement extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const template = options.template;

        if (template) {
          const templateEl = document.createElement("template");
          templateEl.innerHTML = template;
          shadow.appendChild(templateEl.content.cloneNode(true));

          if (name === "counter-app") {
            this.data = options.data();
            this.textNode = []; // Khai báo mảng textNode để lưu các textNode sử dụng this.data.count
            this.bindEventHandlers(shadow);
            this.render();
          }
        }
      }

      bindEventHandlers(shadow) {
        const buttons = shadow.querySelectorAll("button");
        buttons.forEach((button) => {
          const outerHTML = button.outerHTML;
          const regex = /v-on:(\w+)="(\w+.*?)"/;
          const match = outerHTML.match(regex);
          console.log(match[2]);
          const vOnClickAttribute = button.getAttributeNames().toString();
          if (vOnClickAttribute) {
            const eventName = this.extractEventAndLogic(vOnClickAttribute);
            button.addEventListener(eventName, () => {
              try {
                eval(`this.data.` + match[2]);

                const count = this.data.count;

                this.updateCountSpan(count); // Update the count span
                const h1 = shadow.querySelector("h1");
                h1.textContent = this.data.title;
              } catch (error) {
                console.error("Error executing code:", error);
              }
            });
          }
        });
      }

      extractEventAndLogic(vOnClickAttribute) {
        const eventNameArr = vOnClickAttribute.split(":");
        const eventName = eventNameArr[1];
        return eventName;
      }

      updateCountSpan(countContent) {
        if (countContent === undefined) {
          // lần đầu(Khó khăn)
          const shadow = this.shadowRoot;
          const countSpan = shadow.querySelector("h2");
          const countText = countSpan.textContent;
          const splitText = countText.split(/({{ count }})/);
          countSpan.innerHTML = "";
          splitText.forEach((text, i) => {
            if (i !== 1) countSpan.append(document.createTextNode(text));
            else {
              const textNode = document.createTextNode(this.data.count);
              countSpan.append(textNode);
              this.textNode = textNode;
            }
          });
        } else {
          this.textNode.textContent = countContent; // lần 2 trở đi
        }
      }

      render() {
        const shadow = this.shadowRoot;
        const h1 = shadow.querySelector("h1");
        if (h1) {
          h1.textContent = this.data.title;
        }
        // Ban đầu giá trị của thẻ span sẽ là 0
        this.updateCountSpan();
      }
    }

    // Định nghĩa các element
    customElements.define(name, CustomElement);
  }
}
