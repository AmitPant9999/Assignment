document.addEventListener("DOMContentLoaded", function () {
  fetch("ddugky_project.json") // Or './data/ddugky_project.json' if in a subdirectory
    .then((response) => response.json())
    .then((data) => {
      populateData(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
function populateData(data) {
  const tasks = data.tasks;

  document.querySelector(".main-box-1-heading").textContent =
    tasks[0].task_title;
  document.querySelector(".main-box-1-para").textContent =
    tasks[0].task_description;
  document.querySelector(".main_asset-container");
  const assets = data.tasks[0].assets; // Assuming you want the first task's assets

  if (assets && assets.length > 0) {
    const assetsContainer = document.querySelector(".main_asset-container");

    if (assetsContainer) {
      assets.forEach((asset) => {
        const assetElement = createAssetContainer(asset);
        assetsContainer.appendChild(assetElement);
      });
    } else {
      console.error("Assets container not found in HTML.");
    }
  } else {
    console.error("Assets not found in JSON.");
  }
}
function createAssetContainer(asset) {
  const container = document.createElement("div");
  container.classList.add("asset_container");

  let contentHtml = "";

  if (asset.asset_type === "display_asset") {
    if (asset.asset_content_type === "video") {
      contentHtml = `<iframe width="400"  height="315" src="${asset.asset_content}" frameborder="0" allowfullscreen></iframe>`;
    } else if (asset.asset_content_type === "article") {
      contentHtml = `<div class="asset_thread_box"><a  href="${asset.asset_content}" target="_blank" >Read Article</a></div>`;
    }
  } else if (asset.asset_type === "input_asset") {
    if (asset.asset_content_type === "threadbuilder") {
      contentHtml =
    
      '<div class="asset_thread_box"><h4>Thread</h4><textarea placeholder="Enter your threadbuild here" class="asset_thread_box-text"></textarea></div>';
    } else if (asset.asset_content_type === "article") {
      contentHtml =
        '<div class="asset_thread_box"><h4>Title</h4><textarea   class="asset_thread_box-text" placeholder="Write your article here"></textarea></div>';
    }
  }

  container.innerHTML = `

      <div class="asset_heading"><h3 >${asset.asset_title}  </h3><button class="asset_button">!</button></div> 
      <p class="asset_para"><a class="asset_description">Description:</a>${asset.asset_description}</p>
      ${contentHtml}
    `;
    const button = container.querySelector(".asset_button");
    button.addEventListener("click", () => {
      toggleCollapse(container);
    });
  
    

  return container;
}
function toggleCollapse(container) {
    const isCollapsed = container.dataset.collapsed === "true";
    const headingHeight = container.querySelector(".asset_heading").offsetHeight; // Get heading height
  
    if (isCollapsed) {
      // Expand
      container.style.height = "500px"; // Reset to original height
      container.dataset.collapsed = "false";
    } else {
      // Collapse
      container.style.height = `${headingHeight}px`; // Set height to heading height
      container.dataset.collapsed = "true";
    }
  }
  function toggleSideBox() {
    const sideBox = document.querySelector('.side_box');
    sideBox.classList.toggle('collapsed');
  }
  