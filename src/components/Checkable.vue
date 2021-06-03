<template>
    <div class="flex flex-col space-y-4">
        <label class="tappable" v-for="option in options" :key="option.id">
            <input :value="option.id" v-model="checked" :name="id" type="checkbox" class="">
            <p>{{ option.answer }}</p>
        </label>
        <div class="flex mt-4 justify-between space-x-4">
            <button v-if="(index != 1) && !last" class="next-btn" @click="$emit('back')">Back</button>
            <button v-if="!last" class="next-btn" :disabled="checked.length <= 0" @click="$emit('next')">Next</button>
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
            required: true,
        },
        id: {
            type: String,
            required: true,
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
            checked: [],
        }
    },
    watch: {
        checked(newVal) {
            this.$emit('change', newVal);
        }
    },
}
</script>