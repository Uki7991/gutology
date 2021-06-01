<template>
    <div class="w-full flex flex-col">
        <select class="w-full p-3" v-model="selected">
            <option v-for="option in options" :key="option.id" :value="option.id">{{ option.answer }}</option>
        </select>
        <div class="flex mt-4 justify-between space-x-4">
            <button v-if="(index != 1) && !last" class="next-btn" @click="$emit('back')">Back</button>
            <button v-if="!last" class="next-btn" :disabled="selected === null" @click="$emit('next')">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'answer',
        event: 'change',
    },
    props: {
        answer: {
            type: String,
        },
        options: {
            type: Array,
            required: true,
        },
        index: Number,
        last: Boolean,
    },
    data() {
        return {
            selected: null,
        }
    },
    watch: {
        selected: function (newVal) {
            this.$emit('change', newVal);
        }
    }
}
</script>