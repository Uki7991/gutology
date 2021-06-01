<template>
    <div class="flex flex-col">
        <input class="p-3" @input="e=>inputData = e.target.value" :type="computedType">
        <div class="flex mt-4 justify-between space-x-4">
            <button v-if="(index != 1) && !last" class="next-btn" @click="$emit('back')">Back</button>
            <button v-if="!last" class="next-btn" :disabled="inputData === ''" @click="$emit('next')">Next</button>
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
        type: {
            requred: true,
            type: String,
        },
        index: Number,
        last: Boolean,
    },
    data() {
        return {
            inputData: '',
        }
    },
    watch: {
        inputData(newVal) {
            this.$emit('change', newVal);
        }
    },
    computed: {
        computedType() {
            if (this.type === 'Email') {
                return 'email';
            } else if (this.type === 'Input') {
                return 'text';
            }
        }
    }
}
</script>