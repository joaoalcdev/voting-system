class Poll {
  constructor(root, title) {
    this.root = root
    // this.selected = localStorage.getItem('poll-selected')
    this.endpoint = 'https://namevote.netlify.app/poll'

    this.root.insertAdjacentHTML(
      'afterbegin',
      `
            <div class="poll__title">${title}</div>
        `
    )

    this._refresh()
  }

  async _refresh() {
    const response = await fetch(this.endpoint)
    const data = await response.json()

    this.root.querySelectorAll('.poll__option').forEach(option => {
      option.remove()
    })

    for (const option of data) {
      const template = document.createElement('template')
      const fragment = template.content

      template.innerHTML = `
      <section class="d-flex justify-content-center cid-rH8zqv77Jz" id="features1-79">
        <div class="container-fluid">
          <div class="media-container-row">
          <div class="card card-2 m-4 m-md-4 m-lg-0 col-12 col-md-12 col-lg-12">
            <div class="card-img py-2 mx-4 mx-md-0 mx-lg-0">
              <div class="item-image">
                <img src="images/images-animals2.png" />
              </div>
            </div>
            <div class="card-box">
            <div class="poll__option-info">
              <h4 class="card-title mbr-fonts-style display-5 text-center"><span class="poll__label">${
                option.label
              }</span></h4>
              </div>
            </div>
            <p class="mbr-text mbr-fonts-style display-7 text-center">
                <span class="poll__percentage text-center">${
                  option.percentage
                }% total dos votos </span>
              </p>
            <div class="mbr-section-btn">
            <div class="poll__option ${
              this.selected == option.label ? 'poll__option--selected' : ''
            }">
            <div class="border-poll">
              <div class="poll__option-fill-2">
                <div class="poll__option-fill"></div>
              </div>
            </div>
              <a class="button-vote mb-2 btn-underline display-7 d-flex flex-row justify-content-around text-center"
                >Votar
                <span class=" text-center justify-content-center icon-btn mbri-star mbr-iconfont mbr-iconfont-btn"></span>
                </a>
            </div>
            </div>
            <svg class="svg1 wgl-dashes inner-dashed-border animated-dashes">
              <rect
                x="2px"
                y="2px"
                rx="30px"
                ry="30px"
                width="100%"
                height="100%"
              ></rect>
            </svg>
          </div>
          </div>
        </div>
      </section>
            `

      if (!this.selected) {
        fragment
          .querySelector('.poll__option')
          .addEventListener('click', () => {
            fetch(this.endpoint, {
              method: 'post',
              body: `add=${option.label}`,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(() => {
              this.selected = option.label

              localStorage.setItem('poll-selected', option.label)

              // this._refresh()
              document.location.reload(true)
            })
          })
      }

      fragment.querySelector(
        '.poll__option-fill',
        'poll__option-fill-2'
      ).style.width = `${option.percentage}%`

      this.root.appendChild(fragment)
    }
  }
}

const span = new Poll(document.querySelector('.poll'), '')
