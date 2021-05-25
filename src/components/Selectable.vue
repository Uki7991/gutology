<template>
    <div class="w-full flex flex-col">
        <select class="w-full p-3" v-model="selected">
            <option v-for="option in options" :key="option.id" :value="option.id">{{ option.answer }}</option>
        </select>
        <button class="next-btn mt-4" :disabled="selected === null" @click="$emit('next')">Next</button>
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
        }
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