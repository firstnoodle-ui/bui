<template>
    <li class="list-none flex items-center w-full overflow-hidden shadow bg-white">
        <component
            :is="isButton ? 'button' : 'div'"
            class="w-full overflow-hidden flex items-center h-9 px-4 py-1 gap-2 text-ui-input-14"
            :class="{
                'hover:bg-primary-light active:bg-primary-medium': variant === 'checkbox',
                'bg-primary-light': highlighted,
            }"
            @click="onClick"
            @mouseover="emit('hover', option)"
            @focus="emit('focus', option)"
        >
            <main class="flex-1 w-full overflow-hidden flex items-center gap-2">
                <NCheckbox
                    v-if="variant === 'checkbox'"
                    :model-value="selected"
                    class="flex-0"
                    @update:model-value="onToggle"
                />
                <NIcon
                    v-if="option.icon"
                    :icon="option.icon"
                    class="w-4 h-4 flex-0"
                    :class="{
                        'fill-primary': selected && variant === 'single'
                    }"
                />
                <TextHighlight
                    background-color="yellow"
                    :text="option.label"
                    :highlight="search"
                    class="flex-1 text-left min-w-0 truncate"
                    :class="{
                        'text-primary text-ui-label-14-medium': selected && variant === 'single'
                    }"
                />
            </main>
            <span v-if="option.suffix" class="flex-0 text-ui-label-12-caps text-font-secondary">{{ option.suffix }}</span>
            <NButton
                v-if="variant === 'deletable'"
                square
                icon="close"
                size="tiny"
                variant="text"
                @click="emit('delete')"
            />
        </component>
    </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NButton, NCheckbox, NIcon } from '@novonordisk/novoui-vuejs';
import TextHighlight from '@/components/BaseComponents/TextHighlight.vue';
import { SelectListOption, SelectOptionVariant } from './types.ts';

const { hoveredOption, selected, option, variant = 'checkbox' } = defineProps<{
    hoveredOption?: SelectListOption|null,
    option: SelectListOption,
    selected: boolean,
    search?: string,
    variant?: SelectOptionVariant
}>();

const emit = defineEmits(['click', 'delete', 'focus', 'hover']);

const isButton = computed(() => variant === 'checkbox' || variant === 'single');
const highlighted = computed(() => {
    if(hoveredOption) {
        if('id' in hoveredOption && 'id' in option) {
            return hoveredOption.id === option.id;
        }
        return hoveredOption && hoveredOption.label === option.label
    }
})

const onClick = (e:PointerEvent|boolean) => {
    if(variant === 'checkbox' && selected !== undefined) {
        onToggle(e);
    } else {
        emit('click');
    }
}

const onToggle = (e:PointerEvent|boolean) => {
    if(variant === 'checkbox' && e instanceof PointerEvent) {
        emit('click');
    }
}
</script>