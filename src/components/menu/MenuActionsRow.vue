<template>
  <div class="menu-actions-row">
    <Tooltip
      :content="keymapShortcutString"
      placement="bottom"
      :transfer="true"
      class="tooltip-height"
    >
      <span @click="showKeymap">
        <img
          src="./../../assets/icon/keymap.svg"
          alt="Keymap"
          class="action-icon"
        />
      </span>
    </Tooltip>

    <Tooltip
      :content="$t('menu.synchronization')"
      placement="bottom"
      v-if="showIsSyncing"
      :transfer="true"
      class="tooltip-height"
    >
      <CloudSyncIcon class="action-icon" />
    </Tooltip>

    <Tooltip
      :content="$t('menu.cloud_not_connected')"
      placement="bottom"
      v-if="showNotConnectedIcon"
      :transfer="true"
      class="tooltip-height"
    >
      <img
        src="./../../assets/icon/cloud_unset.svg"
        @click="showCloudModal"
        alt="Cloud - not connected"
        class="action-icon"
      />
    </Tooltip>

    <Tooltip
      :content="$t('menu.cloud_connected')"
      placement="bottom"
      v-if="showConnectedIcon"
      :transfer="true"
      class="tooltip-height"
    >
      <img
        src="./../../assets/icon/cloud_connected.svg"
        @click="showCloudModal"
        class="action-icon"
      />
    </Tooltip>

    <Tooltip
      :content="$t('menu.cloud_connection_error')"
      placement="bottom"
      v-if="showConnectionErrorIcon"
      :transfer="true"
      class="tooltip-height"
    >
      <img
        src="./../../assets/icon/cloud_error.svg"
        @click="showCloudModal"
        class="action-icon"
      />
    </Tooltip>

    <Tooltip
      :content="$t('menu.app_settings')"
      placement="bottom"
      :transfer="true"
      class="tooltip-height"
    >
      <img
        src="./../../assets/icon/settings.svg"
        class="action-icon"
        @click="showSettingsModal"
      />
      <!--0-->
    </Tooltip>

    <div class="input-group">
      <button @click="countdown" ref="time_countdown_trig">MIN</button>
      <input ref="myDiv" type="text" name="event-name" autofocus />
    </div>
    <!--Tooltip
      :content="$t('modals.award')"
      placement="bottom"
      :transfer="true"
      class="tooltip-height"
    >
      <img
        src="./../../assets/icon/cloud_connected.svg"
        class="action-icon"
        @click="showAward"
      />
      
    </Tooltip-->
  </div>
</template>

<script>
import keyShortcutMixin from "./../../keyShortcutStringMixin";
import CloudSyncIcon from "./../../assets/icon/CloudSyncIcon";

export default {
  name: "MenuActionsRow",
  mixins: [keyShortcutMixin],
  components: { CloudSyncIcon },
  computed: {
    showNotConnectedIcon() {
      return !this.hasToken && !this.connectionError && !this.showIsSyncing;
    },
    showConnectedIcon() {
      return this.hasToken && !this.connectionError && !this.showIsSyncing;
    },
    showConnectionErrorIcon() {
      return this.connectionError && !this.showIsSyncing;
    },
    showIsSyncing() {
      return this.isSyncing;
    },
    isSyncing() {
      return this.$store.state.cloud.syncInProgress;
    },
    connectionError() {
      return (
        this.$store.state.cloud.connectionError ||
        this.$store.state.cloud.syncError
      );
    },
    hasToken() {
      return !!this.$store.state.cloud.token;
    },
    keymapShortcutString() {
      return `${this.$t("menu.keymap")} - ${this.shortcutString("showKeymap")}`;
    }
  },
  methods: {
    showKeymap() {
      this.$store.dispatch("showKeymapModal");
    },
    showSettingsModal() {
      this.$store.dispatch("showSettingsModal"); //1
    } /*
    showAward() {
      this.$store.dispatch("showAward");
    },*/,
    showCloudModal() {
      this.$store.dispatch("showCloudModal");
    },
    startTimer(duration, display) {
      var start = Date.now(),
        diff,
        minutes,
        seconds;
      function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = diff % 60 | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {
          // add one second so that the count down starts at the full duration
          // example 05:00 not 04:59
          start = Date.now() + 1000;
          display.style.backgroundColor = "#ddb98b";
        }
      }
      // we don't want to wait a full second before the timer starts
      timer();
      this.$refs.time_countdown_trig.value = setInterval(timer, 1000);
    },
    countdown() {
      if (this.$refs.time_countdown_trig.value) {
        clearInterval(this.$refs.time_countdown_trig.value);
      }
      this.startTimer(parseInt(this.$refs.myDiv.value, 10) * 60, event.target);
      this.$refs.time_countdown_trig.style.backgroundColor = "#a9a9a9";
    }
  }
};
</script>

<style scoped>
.menu-actions-row {
  padding: 8px 32px;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  justify-content: space-around;
  align-items: center;
  background-color: #404c5a;
  width: 100%;
  user-select: none;
}

.tooltip-height {
  height: 24px;
}

.action-icon {
  color: #2c2e32;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  opacity: 0.6;
  cursor: pointer;
  filter: drop-shadow(0 0 2px rgba(70, 70, 70, 0.8));
}

.action-icon:hover {
  opacity: 1;
  color: #2c2e32;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.8));
}

i {
  padding-left: 8px;
  cursor: pointer;
}

i:hover {
  color: #fff;
}

svg {
  cursor: pointer;
  margin-top: 2px;
}

svg:hover {
  color: #fff;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-bottom: 16px;
}
.input-group button {
  display: block;
  font-size: 1.1em;
  padding: 3px;
  background-color: #333;
  color: #f5f5f5;
}
.input-group input {
  width: 100%;
  max-width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 2em;
  padding: 6px;
  color: #333;
  transition: border-color 0.3s ease;
}
.input-group input:focus {
  outline: none;
  border-color: #333;
}
.input-group select {
  width: 100%;
  height: 100%;
  margin-top: 0;
  font-size: 2em;
  padding: 3px;
  border: none;
  color: #333;
}
.input-group select:focus {
  outline: none;
}
.input-group option {
  font-weight: 100;
}
.input-group option:focus {
  outline: none;
}
</style>
