<template>
  <h2>Page {{ pageType }}</h2>
  <div>
    {{ data?.content }}
    <br>
  </div>
  <div>
    <br>
    <button @click="selectPage(PageType.PAGE_A)">
      Page A
    </button>
    <button @click="selectPage(PageType.PAGE_B)">
      Page B
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useQuery, UseQueryOptions } from "@tanstack/vue-query";

enum PageType {
  PAGE_A = 'page-a',
  PAGE_B = 'page-b',
}

interface PageData {
  content: string,
}

export function usePageContent(
    pageType: Ref<PageType>,
) {
  const options: UseQueryOptions<PageData, unknown> = {
    queryKey: [pageType],
    queryFn: () => {
      return new Promise((resolve) => {
        console.warn(`Emulating server request for pageType='${pageType.value}'`);
        setTimeout(() => {
          const result: PageData = {
            content: `Content for page: '${pageType.value}'`,
          }
          resolve(result);
        }, 3000);
      })
    },
    staleTime: 24 * 60 * 60 * 1000,
    keepPreviousData: true,
  };

  return useQuery(options);
}

export default defineComponent({
  name: 'Content',
  components: {},
  async setup() {
    const pageType = ref(PageType.PAGE_A);

    const {
      data,
      suspense,
    } = usePageContent(pageType);

    const selectPage = (newPageType: PageType) => {
      pageType.value = newPageType;
    };

    await suspense();

    return {
      pageType,
      data,
      PageType,
      selectPage,
    };
  },
});
</script>
