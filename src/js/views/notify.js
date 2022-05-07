/**
 * function notify. Shows notification message
 * @param {Object} settings
 * @param {String} settings.msg
 * @param {String} settings.className
 * @param {Number} settings.timeout
 */

function getContainer() {
  const notifyContainer = document.querySelector(".notify-container");
  return notifyContainer;
}

/**
 * function createNotifyContainer - creates container for notify messages
 */
function createNotifyContainer() {
  const contTemplate = notifyContTemplate();
  document.body.insertAdjacentHTML("beforeend", contTemplate);
  return getContainer();
}

function notifyContTemplate() {
  return `
  <div class="notify-container" style="position: fixed; top: 10px; right: 10px; z-index: 99;">
  </div>
  `;
}

export default function notify({
  msg = "info-message",
  className = "alert-info",
  timeout = 2000,
} = {}) {
  let notContainer;
  if (!getContainer()) {
    notContainer = createNotifyContainer();
  } else {
    notContainer = getContainer();
  }

  const index = getAlertIndex();
  const messageEl = templateAlert(msg, className, index);
  notContainer.insertAdjacentHTML("afterbegin", messageEl);
  setTimeout(() => {
    const el = document.querySelector(`div[data-index="${index}"]`);
    console.log(el);
    notContainer.removeChild(el);
  }, timeout);
}

/**
 * function templateAlert - returns html of alert element
 * @param {String} msg
 * @param {String} className
 * @param {Number} index
 * @returns {String} - returns html of alert element
 */

function templateAlert(msg, className, index) {
  return `
  <div class="alert ${className}" data-index="${index}">
  ${msg}
  </div>
  `;
}

/**
 * function getAlertIndex - gets next index of notifications
 * @returns {Number}  - next index of notifications
 *
 */

function getAlertIndex() {
  const notifications = document.querySelectorAll(".alert");
  return notifications.length;
}
