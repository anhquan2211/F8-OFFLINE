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
          const vOnClickAttribute = button.getAttributeNames().toString();
          if (vOnClickAttribute) {
            const eventName = this.extractEventAndLogic(vOnClickAttribute);
            button.addEventListener(eventName, () => {
              try {
                let count = this.data.count;
                eval(`this.data.` + match[2]);
                this.updateCountSpan(); // Update the count span
                this.render();
                console.log(count);
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

      updateCountSpan() {
        const shadow = this.shadowRoot;
        const countSpan = shadow.querySelector(".count-span");
        if (countSpan) {
          countSpan.textContent = this.data.count;
        }
      }

      render() {
        const shadow = this.shadowRoot;
        const h1 = shadow.querySelector("h1");

        if (h1) {
          h1.textContent = this.data.title;
        }

        //Ban đầu giá trị của thẻ span sẽ là 0
        this.updateCountSpan();
      }
    }

    // Định nghĩa các element
    customElements.define(name, CustomElement);
  }
}
