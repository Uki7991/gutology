<template>
    <div class="flex flex-col">
        <label class="tappable mb-5" v-for="option in options" :key="option.id">
            <input :value="option.id" v-model="checked" :name="id" type="radio" class="">
            <p>{{ option.answer }}</p>
        </label>
        <button class="next-btn mt-4" @click="$emit('next')" :disabled="checked === null">Next</button>
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
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            checked: null,
        }
    },
    watch: {
        checked(newVal) {
            this.$emit('change', newVal);
        }
    },
}
</script>