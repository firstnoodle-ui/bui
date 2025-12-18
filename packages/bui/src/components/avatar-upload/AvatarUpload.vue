<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { BButton, BConfirmCancel, BFlexbox, BIcon, BModal } from "../";

const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    size?: number;
    disabled?: boolean;
    cropShape?: "circle" | "square";
  }>(),
  {
    modelValue: null,
    size: 120,
    disabled: false,
    cropShape: "circle",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string | null];
  "change": [value: string | null];
}>();

const fileInputRef = ref<HTMLInputElement>();
const canvasRef = ref<HTMLCanvasElement>();
const imageRef = ref<HTMLImageElement>();
const cropModalRef = ref<typeof BModal>();
const originalImage = ref<HTMLImageElement | null>(null);
const originalImageDataUrl = ref<string | null>(null); // Store the original uncropped image
const previewUrl = ref<string | null>(props.modelValue);

// Crop state (crop area stays centered and fixed)
const cropSize = ref(100);
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
const containerSize = 510;

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

const handleAvatarClick = () => {
  if (props.disabled) return;

  // If there's already an image and we have the original, open crop modal with original image
  if (previewUrl.value && originalImageDataUrl.value) {
    const img = new Image();
    img.onload = () => {
      originalImage.value = img;
      imageWidth.value = img.width;
      imageHeight.value = img.height;

      // Set crop size (70% of container)
      cropSize.value = containerSize * 0.5;

      // Calculate minimum scale to ensure image can cover the crop area
      const minScaleForCrop = Math.max(cropSize.value / img.width, cropSize.value / img.height);
      minScale.value = minScaleForCrop;

      // Start with a scale that fits the image in container but not smaller than minScale
      const scaleToFit = Math.min(containerSize / img.width, containerSize / img.height);
      scale.value = Math.max(scaleToFit, minScaleForCrop);

      // Center the image
      const displayWidth = img.width * scale.value;
      const displayHeight = img.height * scale.value;
      imageX.value = (containerSize - displayWidth) / 2;
      imageY.value = (containerSize - displayHeight) / 2;
    };
    img.src = originalImageDataUrl.value;
  }
  else {
    // No image yet, open file dialog
    openFileDialog();
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      // Store the original image data URL
      originalImageDataUrl.value = dataUrl;

      const img = new Image();
      img.onload = () => {
        originalImage.value = img;
        imageWidth.value = img.width;
        imageHeight.value = img.height;

        // Set crop size (70% of container)
        cropSize.value = containerSize * 0.7;

        // Calculate minimum scale to ensure image can cover the crop area
        const minScaleForCrop = Math.max(cropSize.value / img.width, cropSize.value / img.height);
        minScale.value = minScaleForCrop;

        // Start with a scale that fits the image in container but not smaller than minScale
        const scaleToFit = Math.min(containerSize / img.width, containerSize / img.height);
        scale.value = Math.max(scaleToFit, minScaleForCrop);

        // Center the image
        const displayWidth = img.width * scale.value;
        const displayHeight = img.height * scale.value;

        imageX.value = (containerSize - displayWidth) / 2;
        imageY.value = (containerSize - displayHeight) / 2;

        // Wait a tick then open modal
        setTimeout(() => {
          // Modal component will be rendered
        }, 10);
      };
      img.src = dataUrl;
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

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
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
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseup", handleMouseUp);
};

const handleZoom = (delta: number) => {
  const newScale = Math.max(minScale.value, Math.min(scale.value + delta, 3));

  if (newScale !== scale.value) {
    scale.value = newScale;
  }
};

const zoomIn = () => handleZoom(0.1);
const zoomOut = () => handleZoom(-0.1);

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

// save for later
// const removeAvatar = () => {
//   previewUrl.value = null;
//   originalImageDataUrl.value = null;
//   emit("update:modelValue", null);
//   emit("change", null);
// };

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
      @click="handleAvatarClick"
    >
      <img v-if="previewUrl" :src="previewUrl" alt="Avatar" class="w-full h-full object-cover">
      <div v-else class="flex flex-col items-center gap-2 text-xs italic text-secondary">
        <BIcon name="user" />
        <span class="text-center">Click to add an avatar</span>
      </div>

      <!-- Hover Overlay -->
      <div
        v-if="!disabled"
        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <BIcon name="edit" class="text-white size-8" />
      </div>
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
    <BModal
      v-if="originalImage"
      ref="cropModalRef"
      title="Crop Avatar"
      width-class="max-w-xl"
      @close="cancelCrop"
    >
      <template #main>
        <div class="flex flex-col items-center gap-4 pb-8">
          <!-- Crop Canvas -->
          <div
            class="relative bg-slate-100 dark:bg-slate-800 overflow-hidden select-none transition-all"
            :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
            :style="{ width: `${containerSize}px`, height: `${containerSize}px` }"
            @mousedown="handleMouseDown"
          >
            <!-- Image -->
            <div
              v-if="originalImage"
              class="absolute border border-yellow-300 pointer-events-none"
              :style="{
                width: `${imageWidth * scale}px`,
                height: `${imageHeight * scale}px`,
                left: `${imageX}px`,
                top: `${imageY}px`,
              }"
            >
              <img
                v-if="originalImage"
                ref="imageRef"
                :src="originalImage.src"
                alt="Original"
                class="w-full h-full"
              >
            </div>

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
            <div class="absolute top-4 left-0 w-full flex justify-center">
              <div class="flex items-center h-8 px-3 rounded-full bg-primary text-sm text-primary">
                Drag to reposition
              </div>
            </div>
            <div class="absolute bottom-4 left-0 w-full flex justify-center gap-1">
              <section class="bg-primary rounded-lg overflow-hidden">
                <BButton
                  icon="plus"
                  variant="outlineSubtle"
                  class="z-0 hover:z-10 focus:z-10 active:z-10 "
                  :disabled="scale >= 3"
                  :style="{ borderRadius: '8px 0 0 8px' }"
                  @click="zoomIn"
                />
                <BButton
                  icon="dash"
                  variant="outlineSubtle"
                  class="z-0 hover:z-10 focus:z-10 active:z-10 -ml-px"
                  :disabled="scale <= minScale"
                  :style="{ borderRadius: '0px 8px 8px 0px' }"
                  @click="zoomOut"
                />
              </section>
            </div>
          </div>

          <!-- Hidden canvas for processing -->
          <canvas ref="canvasRef" class="hidden" />
        </div>
      </template>

      <template #footer>
        <BFlexbox class="w-full" justify="between">
          <BButton
            :disabled="disabled"
            variant="outlineSubtle"
            label="Upload"
            icon="photo"
            @click="openFileDialog"
          />
          <div class="flex items-center gap-2">
            <BConfirmCancel
              order="confirm-last"
              confirm-icon="check"
              confirm-label="Save"
              cancel-variant="text"
              @cancel="cancelCrop"
              @confirm="cropImage"
            />
          </div>
        </BFlexbox>
      </template>
    </BModal>
  </div>
</template>
