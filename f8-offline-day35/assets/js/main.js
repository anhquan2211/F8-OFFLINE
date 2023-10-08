/** @format */

// /** @format */
import { client } from "./client.js";

const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");

let limit = 3;
let page = 1;
let allDataLoaded = false;

// Fetch the posts data from api
async function getPosts() {
  const { data } = await client.get(`/posts?_limit=${limit}&_page=${page}`);

  if (data.length === 0) {
    console.log("allDataLoaded = true");
    allDataLoaded = true;
  }

  return data;
}

//Render data in the DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="post">
    <div class="post-header">
      <!-- HEADER-LEFT -->
      <div class="header-left">
        <div class="avatar skeleton">
          <img src="${post.avatar}" alt="Avatar" />
        </div>

        <div class="desc-wrap">
          <div class="name skeleton">
            ${post.name}

            <svg fill="currentColor" viewBox="0 0 12 13" width="1em" height="1em" class="x1lliihq x1k90msu x2h7rmj x1qfuztq x1qq9wsj x1kpxq89 xsmyaan" title="Tài khoản đã xác minh"><title>Tài khoản đã xác minh</title><g fill-rule="evenodd" transform="translate(-98 -917)"><path d="m106.853 922.354-3.5 3.5a.499.499 0 0 1-.706 0l-1.5-1.5a.5.5 0 1 1 .706-.708l1.147 1.147 3.147-3.147a.5.5 0 1 1 .706.708m3.078 2.295-.589-1.149.588-1.15a.633.633 0 0 0-.219-.82l-1.085-.7-.065-1.287a.627.627 0 0 0-.6-.603l-1.29-.066-.703-1.087a.636.636 0 0 0-.82-.217l-1.148.588-1.15-.588a.631.631 0 0 0-.82.22l-.701 1.085-1.289.065a.626.626 0 0 0-.6.6l-.066 1.29-1.088.702a.634.634 0 0 0-.216.82l.588 1.149-.588 1.15a.632.632 0 0 0 .219.819l1.085.701.065 1.286c.014.33.274.59.6.604l1.29.065.703 1.088c.177.27.53.362.82.216l1.148-.588 1.15.589a.629.629 0 0 0 .82-.22l.701-1.085 1.286-.064a.627.627 0 0 0 .604-.601l.065-1.29 1.088-.703a.633.633 0 0 0 .216-.819"></path></g></svg>  
          </div>
          <div class="info">
            <div class="time skeleton">${post.time}</div>
            <div class="icon-public">
              <i class="fa-solid fa-earth-asia"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- HEADER-RIGHT -->
      <div class="header-right">
        <div class="icon icon-dot">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
        <div class="icon icon-remove">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>

    <div class="post-content skeleton">
      ${post.content}
    </div>

    <div class="post-img skeleton">
      <img src="${post.postImg}" alt="" />
    </div>

    <div class="post-reaction">
      <div class="reaction-left">
        <div class="icon-reaction">
          <img
            class="x16dsc37"
            height="18"
            role="presentation"
            src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
            width="18"
          />
        </div>
        <div class="name-reaction skeleton">
          ${post.nameReaction}
        </div>
      </div>

      <div class="reaction-right">
        <div class="action comment">
          <div class="number skeleton">${post.numberComment}</div>
          <div class="icon-comment">
            <i class="fa-solid fa-comment"></i>
          </div>
        </div>

        <div class="action share">
          <div class="number skeleton">${post.numberShare}</div>
          <div class="icon-share"><i class="fa-solid fa-share"></i></div>
        </div>
      </div>
    </div>

    <div class="post-action">
      <div class="action action-like">
        <div class="icon-like skeleton"><i class="fa-regular fa-thumbs-up"></i></div>
        <div class="desc">Thích</div>
      </div>
      <div class="action action-comment">
        <div class="icon-comment skeleton"><i class="fa-solid fa-comment"></i></div>
        <div class="desc">Bình luận</div>
      </div>
      <div class="action action-share">
        <div class="icon-share skeleton"><i class="fa-solid fa-share"></i></div>
        <div class="desc">Chia sẻ</div>
      </div>
    </div>
  </div>
        `;

    postsContainer.appendChild(postEl);
  });
}

// Add Loader
function showLoading() {
  loading.classList.add("show");

  setTimeout(async () => {
    loading.classList.remove("show");

    page++;
    await showPosts();

    skeleton();

    if (allDataLoaded) {
      const message = document.createElement("div");
      message.textContent = "You have viewed all the posts";
      message.classList.add("end-message");
      postsContainer.appendChild(message);
    }
  }, 1000);
}

//Render
showPosts();

// Add event scroll
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (!allDataLoaded && scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

function skeleton() {
  // Define a function to remove the "skeleton" class from elements
  const removeSkeletonClass = () => {
    const allSkeleton = document.querySelectorAll(".skeleton");
    allSkeleton.forEach((item) => {
      item.classList.remove("skeleton");
    });
  };

  // Use setTimeout to trigger the class removal after the specified delay (2 seconds)
  setTimeout(removeSkeletonClass, 2000);
}

// Call the skeleton function when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  skeleton();
});
