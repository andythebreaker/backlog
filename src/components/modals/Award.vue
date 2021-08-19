<template>
  <Modal
    id="award"
    :value="isVisible"
    :title="$t('modals.award')"
    @on-visible-change="visibleChange"
  >
    <p id="award_video_info_id">{{ award_video_info }}</p>
    <button
      ref="find_viedo_element_then_add_ended_event"
      id="find_viedo_element_then_add_ended_event"
      style="display: none;"
      onclick="function checkFlag() { if (document.getElementById('streamable_video_element')) { document.getElementById('streamable_video_element').addEventListener('ended',()=>{document.getElementById('closeAwardModalButton').click()});}else{setTimeout(() => {checkFlag();}, 5);}} checkFlag();"
    >
      find_viedo_element_then_add_ended_event
    </button>
    <div id="video_iframe">
      <span v-html="HTMLcontent"></span>
    </div>
    <!--video
      :width="streamable_api_width"
      :height="streamable_api_height"
      controls
      autoplay
    >
      <source :src="streamable_api_src" type="video/mp4" />
      Your browser does not support the video tag.
    </video-->
    <div slot="footer">
      <Button
        type="primary"
        size="large"
        @click="closeModal"
        id="closeAwardModalButton"
        >{{ $t("common.ok") }}
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "Award",
  computed: {
    isVisible() {
      return this.$store.state.modals.award.isVisible;
    } /*,
    clientWidth() {
      return this.$store.state.modals.award.clientWidth;
    }*/
  },
  methods: {
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    },
    visibleChange(isVisible) {
      if (!isVisible) {
        this.HTMLcontent = `<p>fetching...</p>`;
        this.closeModal();
      } else {
        this.$store
          .dispatch("getStreamableVideos")
          .then(return_getStreamableVideos => {
            if (return_getStreamableVideos) {
              var streamable_files = return_getStreamableVideos;
              var random_streamable_files =
                streamable_files[
                  this.getRandomIntInclusive(0, streamable_files.length - 1)
                ];
              this.award_video_info = "[" + random_streamable_files + "] => ";
              fetch(
                "https://api.streamable.com/videos/" + random_streamable_files,
                {
                  method: "GET"
                }
              )
                .then(res => {
                  if (res.ok) {
                    return res.json();
                  } else {
                    throw new Error("RES ERROR : NOT OK");
                  }
                })
                .then(response => {
                  this.award_video_info = this.award_video_info + response.url;
                  /*this.streamable_api_src = response.files.mp4.url;
            this.streamable_api_width = response.files.mp4.width;
            this.streamable_api_height = response.files.mp4.height;*/
                  this.HTMLcontent = `
            <video
      width="${response.files.mp4.width}"
      height="${response.files.mp4.height}"
      controls
      autoplay
      id="streamable_video_element"
    >
      <source src="${response.files.mp4.url}" type="video/mp4" />
      Your browser does not support the video tag.
    </video>`;
                  /*TODO:
    adjest width and height -> don't extend fram
    json let list out
    */
                  this.$refs.find_viedo_element_then_add_ended_event.click();
                })
                .catch(error => {
                  this.award_video_info =
                    this.award_video_info +
                    "streamable api [" +
                    error.toString() +
                    "]";
                });
            } else {
              this.award_video_info =
                "streamable videos data doesn't exist, the video won't be display and you need to manualy close this pop up window.";
            }
          });

        //this.award_video_info = this.clientWidth();
        /*var streamable_files = [
          "69ojm",
          "4qevbm",
          "stfvfh",
          "3m33i",
          "yjblj3",
          "267fxl",
          "jo57wj",
          "o994dr",
          "wfdqdm",
          "ue4tf",
          "pc7308",
          "hqlo66",
          "u8v6a",
          "1kb8dl"
        ];
        fetch(
          "https://api.streamable.com/videos/" +
            streamable_files[
              this.getRandomIntInclusive(0, streamable_files.length - 1)
            ],
          {
            method: "GET"
          }
        )
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("RES ERROR : NOT OK");
            }
          })
          .then(response => {
            this.award_video_info = response.url;
            this.HTMLcontent = `
            <video
      width="${response.files.mp4.width}"
      height="${response.files.mp4.height}"
      controls
      autoplay
      id="streamable_video_element"
    >
      <source src="${response.files.mp4.url}" type="video/mp4" />
      Your browser does not support the video tag.
    </video>`;
            this.$refs.find_viedo_element_then_add_ended_event.click();
          })
          .catch(error => {
            this.award_video_info = "streamable api [" + error.toString() + "]";
          });*/
      }
    },
    closeModal() {
      this.$store.dispatch("hideAward");
    },
    video_ended() {
      this.award_video_info = "finish";
      this.$store.dispatch("hideAward");
    }
  },
  data() {
    return {
      award_video_info: "wtf, it shouldn't be like this!",
      streamable_api_width: "0",
      streamable_api_height: "0",
      streamable_api_src: "#",
      HTMLcontent: `<p>fetching...</p>`
    };
  } /*,
  mounted() {
    var find_viedo_element_then_add_ended_event = document.createElement(
      "button"
    );
    find_viedo_element_then_add_ended_event.id =
      "find_viedo_element_then_add_ended_event";
    find_viedo_element_then_add_ended_event.style.display = "none";
    find_viedo_element_then_add_ended_event.setAttribute(
      "onclick",
      "document.getElementById('streamable_video_element').addEventListener('ended',()=>{document.getElementById('closeAwardModalButton').click()})"
    );
    document.body.appendChild(find_viedo_element_then_add_ended_event);
  }*/
};
</script>

<style scoped>
.lang-pick {
  display: flex;
  align-items: center;
  margin: 8px 0;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
}

.lang-pick.active {
  font-weight: bold;
  color: #000;
}

.lang-pick:hover {
  box-shadow: 0 2px 8px #e9e9e9;
}

.flag-icon {
  width: 22px;
  margin-right: 8px;
  box-shadow: 0 1px 6px #9a9a9a;
}
</style>
