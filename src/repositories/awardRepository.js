const { db } = require("./../persistence");

const streamableVideos_default_array = [
    /*"b4puyh",
    "hn8hq",
    "bgwrtj",
    "wyxjvo",
    "aj52e0",
    "hk4fxo"*/
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
    "1kb8dl", "hsd3q6", "jzrc15", "tqr0nj", "r20tzm", "ovh66r", "ap3hbn", "ba1fnd", "ew8s36", "493jca", "ersue0", "k02c4x", "9utbvv", "2dekz1", "wwj20y", "amul7p", "wn5r7f", "yqg7u1", "v1jh9k", "rzi6jf", "n52oeq", "d011sm", "hxi3mn", "pw1jgo",
];

db.defaults({
    awardSettings: {
        "streamableVideos": streamableVideos_default_array
    }
}).write();

export default {
    getAwardSettings() {
        return db.get("awardSettings")
            .cloneDeep()
            .value();
    },
    getStreamableVideos() {
        if (this.hasStreamableVideosProperty()) {
            return db.get("awardSettings.streamableVideos")
                .cloneDeep()
                .value();
        } else {
            return null;
        }
    },
    hasStreamableVideosProperty() {
        return db.has("awardSettings.streamableVideos").value();
    },
    streamableVideos_default_array,
    setupStreamableVideos() {
        this.rewriteStreamableVideos(streamableVideos_default_array);
    },
    updateAwardSettings(objAwardSettings) {
        return db.get("awardSettings")
            .assign(objAwardSettings)
            .write();
    },
    rewriteStreamableVideos(arrayStreamableVideos) {
        return this.updateAwardSettings({ "streamableVideos": arrayStreamableVideos });
    },
    addStreamableVideo(stringStreamableVideoURL) {
        var tmp_array = this.getStreamableVideos();
        tmp_array.push(stringStreamableVideoURL);
        this.rewriteStreamableVideos(tmp_array);
    }
};