<template>
  <Modal id="award"
         :value="isVisible"
         :title="$t('modals.award')"
         @on-visible-change="visibleChange"
  >
    <div slot="footer">
      <Button
          type="primary"
          size="large"
          @click="closeModal">{{$t("common.ok")}}
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
      }
    },
    methods: {
      visibleChange(isVisible) {
        if (!isVisible) {
          this.closeModal();
        }
      },
      closeModal() {
        this.$store.dispatch("hideAward");
      },
    },
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
    transition: all .2s;
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
