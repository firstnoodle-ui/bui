<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { BButton, BIcon, BModal } from "../";

const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    size?: number;
    disabled?: boolean;
    placeholder?: string;
    cropShape?: "circle" | "square";
    aspectRatio?: number;
  }>(),
  {
    modelValue: null,
    size: 120,
    disabled: false,
    placeholder: "Upload Avatar",
    cropShape: "circle",
    aspectRatio: 1,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string | null];
  change: [value: string | null];
}>();

const fileInputRef = ref<HTMLInputElement>();
const canvasRef = ref<HTMLCanvasElement>();
const imageRef = ref<HTMLImageElement>();
const cropModalRef = ref<typeof BModal>();
const originalImage = ref<HTMLImageElement | null>(null);
const previewUrl = ref<string | null>(props.modelValue);

// Crop state (crop area stays centered and fixed)
const cropSize = ref(200);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);
const scale = ref(1);
const minScale = ref(1);

// Image dimensions and position
const imageWidth = ref(0);
const imageHeight = ref(0);
const imageX = ref(0); // Image position relative to container
const imageY = ref(0);
const containerSize = 400;

watch(
  () => props.modelValue,
  (newValue) => {
    previewUrl.value = newValue;
  },
);

const avatarStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  borderRadius: props.cropShape === "circle" ? "50%" : "8px",
}));

const openFileDialog = () => {
  if (!props.disabled) {
    fileInputRef.value?.click();
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        originalImage.value = img;
        imageWidth.value = img.width;
        imageHeight.value = img.height;

        // Calculate initial scale to fit container
        const scaleToFit = Math.min(containerSize / img.width, containerSize / img.height);
        minScale.value = scaleToFit;
        scale.value = scaleToFit;

        // Set crop size (70% of the smaller dimension)
        const displayWidth = img.width * scale.value;
        const displayHeight = img.height * scale.value;
        cropSize.value = Math.min(displayWidth, displayHeight) * 0.7;

        // Center the image
        imageX.value = (containerSize - displayWidth) / 2;
        imageY.value = (containerSize - displayHeight) / 2;

        // Wait a tick then open modal
        setTimeout(() => {
          // Modal component will be rendered
        }, 10);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Reset input value to allow selecting the same file again
  target.value = "";
};

const handleMouseDown = (event: MouseEvent) => {
  isDragging.value = true;
  dragStartX.value = event.clientX - imageX.value;
  dragStartY.value = event.clientY - imageY.value;
};

const handleMouseMove = (event: MouseEvent) => {
  if (isDragging.value) {
    // Calculate new image position
    let newX = event.clientX - dragStartX.value;
    let newY = event.clientY - dragStartY.value;

    // Crop area is centered in the container
    const cropCenterX = containerSize / 2;
    const cropCenterY = containerSize / 2;
    const cropLeft = cropCenterX - cropSize.value / 2;
    const cropRight = cropCenterX + cropSize.value / 2;
    const cropTop = cropCenterY - cropSize.value / 2;
    const cropBottom = cropCenterY + cropSize.value / 2;

    // Constrain image so crop area never goes outside image bounds
    const displayWidth = imageWidth.value * scale.value;
    const displayHeight = imageHeight.value * scale.value;

    // The image must always cover the crop area
    newX = Math.min(newX, cropLeft); // Image can't be too far right
    newX = Math.max(newX, cropRight - displayWidth); // Image can't be too far left
    newY = Math.min(newY, cropTop); // Image can't be too far down
    newY = Math.max(newY, cropBottom - displayHeight); // Image can't be too far up

    imageX.value = newX;
    imageY.value = newY;
  }
};

const handleMouseUp = () => {
  isDragging.value = false;
};

const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  const delta = event.deltaY * -0.001;
  const newScale = Math.max(minScale.value, Math.min(scale.value + delta, 3));

  if (newScale !== scale.value) {
    const oldScale = scale.value;
    scale.value = newScale;

    // Calculate the center of the crop area
    const cropCenterX = containerSize / 2;
    const cropCenterY = containerSize / 2;

    // Adjust image position to keep the crop area centered on the same part of the image
    const newDisplayWidth = imageWidth.value * newScale;
    const newDisplayHeight = imageHeight.value * newScale;

    // Calculate where the crop center was in the old image coordinates
    const cropCenterInImageX = (cropCenterX - imageX.value) / oldScale;
    const cropCenterInImageY = (cropCenterY - imageY.value) / oldScale;

    // Calculate new image position to keep the same point under the crop center
    let newX = cropCenterX - (cropCenterInImageX * newScale);
    let newY = cropCenterY - (cropCenterInImageY * newScale);

    // Constrain image position
    const cropLeft = cropCenterX - cropSize.value / 2;
    const cropRight = cropCenterX + cropSize.value / 2;
    const cropTop = cropCenterY - cropSize.value / 2;
    const cropBottom = cropCenterY + cropSize.value / 2;

    newX = Math.min(newX, cropLeft);
    newX = Math.max(newX, cropRight - newDisplayWidth);
    newY = Math.min(newY, cropTop);
    newY = Math.max(newY, cropBottom - newDisplayHeight);

    imageX.value = newX;
    imageY.value = newY;
  }
};

const cropImage = () => {
  if (!originalImage.value || !canvasRef.value) return;

  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Set canvas size to desired output size
  const outputSize = 512;
  canvas.width = outputSize;
  canvas.height = outputSize;

  // Calculate crop area position (centered in container)
  const cropCenterX = containerSize / 2;
  const cropCenterY = containerSize / 2;
  const cropLeft = cropCenterX - cropSize.value / 2;
  const cropTop = cropCenterY - cropSize.value / 2;

  // Calculate source coordinates in original image
  // Convert from screen coordinates to image coordinates
  const sourceX = (cropLeft - imageX.value) / scale.value;
  const sourceY = (cropTop - imageY.value) / scale.value;
  const sourceSize = cropSize.value / scale.value;

  // Draw cropped and scaled image
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, outputSize, outputSize);

  if (props.cropShape === "circle") {
    ctx.save();
    ctx.beginPath();
    ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
  }

  ctx.drawImage(
    originalImage.value,
    sourceX,
    sourceY,
    sourceSize,
    sourceSize,
    0,
    0,
    outputSize,
    outputSize,
  );

  if (props.cropShape === "circle") {
    ctx.restore();
  }

  const croppedDataUrl = canvas.toDataURL("image/png");
  previewUrl.value = croppedDataUrl;
  emit("update:modelValue", croppedDataUrl);
  emit("change", croppedDataUrl);

  cropModalRef.value?.close();
};

const removeAvatar = () => {
  previewUrl.value = null;
  emit("update:modelValue", null);
  emit("change", null);
};

const cancelCrop = () => {
  cropModalRef.value?.close();
  originalImage.value = null;
};
</script>

<template>
  <div class="inline-flex flex-col items-center gap-3">
    <!-- Avatar Preview -->
    <div
      :style="avatarStyle"
      class="relative overflow-hidden bg-tertiary border border-default flex items-center justify-center cursor-pointer group"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      @click="openFileDialog"
    >
      <img v-if="previewUrl" :src="previewUrl" alt="Avatar" class="w-full h-full object-cover">
      <div v-else class="text-secondary">
        <BIcon name="user" :class="`size-[${size * 0.4}px]`" />
      </div>

      <!-- Hover Overlay -->
      <div
        v-if="!disabled"
        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <BIcon name="camera" class="text-white size-8" />
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-2">
      <BButton
        :disabled="disabled"
        variant="outline"
        small
        label="Upload"
        icon="photo"
        @click="openFileDialog"
      />
      <BButton
        v-if="previewUrl"
        :disabled="disabled"
        variant="textSubtle"
        small
        icon="close"
        @click="removeAvatar"
      />
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileSelect"
    >

    <!-- Crop Modal -->
    <BModal v-if="originalImage" ref="cropModalRef" title="Crop Avatar" @close="cancelCrop">
      <template #main>
        <div class="flex flex-col items-center gap-4 p-4">
          <!-- Crop Canvas -->
          <div
            class="relative bg-slate-100 dark:bg-slate-800 overflow-hidden select-none"
            :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
            :style="{ width: `${containerSize}px`, height: `${containerSize}px` }"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            @mouseleave="handleMouseUp"
            @wheel="handleWheel"
          >
            <!-- Image -->
            <img
              v-if="originalImage"
              ref="imageRef"
              :src="originalImage.src"
              alt="Original"
              class="absolute pointer-events-none"
              :style="{
                width: `${imageWidth * scale}px`,
                height: `${imageHeight * scale}px`,
                left: `${imageX}px`,
                top: `${imageY}px`,
              }"
            >

            <!-- Crop Overlay -->
            <div class="absolute inset-0 pointer-events-none">
              <!-- Dark overlay -->
              <svg class="w-full h-full">
                <defs>
                  <mask id="crop-mask">
                    <rect width="100%" height="100%" fill="white" />
                    <rect
                      v-if="cropShape === 'square'"
                      :x="(containerSize - cropSize) / 2"
                      :y="(containerSize - cropSize) / 2"
                      :width="cropSize"
                      :height="cropSize"
                      fill="black"
                      rx="8"
                    />
                    <circle
                      v-else
                      :cx="containerSize / 2"
                      :cy="containerSize / 2"
                      :r="cropSize / 2"
                      fill="black"
                    />
                  </mask>
                </defs>
                <rect width="100%" height="100%" fill="black" opacity="0.5" mask="url(#crop-mask)" />
              </svg>

              <!-- Crop border -->
              <div
                class="absolute border-2 border-white shadow-lg"
                :class="{ 'rounded-full': cropShape === 'circle', 'rounded-lg': cropShape === 'square' }"
                :style="{
                  left: `${(containerSize - cropSize) / 2}px`,
                  top: `${(containerSize - cropSize) / 2}px`,
                  width: `${cropSize}px`,
                  height: `${cropSize}px`,
                }"
              />
            </div>
          </div>

          <!-- Instructions -->
          <p class="text-sm text-secondary text-center">
            Drag to reposition • Scroll to zoom
          </p>

          <!-- Hidden canvas for processing -->
          <canvas ref="canvasRef" class="hidden" />
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-2 w-full">
          <BButton variant="textSubtle" label="Cancel" @click="cancelCrop" />
          <BButton variant="fill" label="Apply" @click="cropImage" />
        </div>
      </template>
    </BModal>
  </div>
</template>
