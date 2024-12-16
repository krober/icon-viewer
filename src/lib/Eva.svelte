<script lang="ts">
  import { icons } from 'eva-icons';
  const fill = Object.entries(icons).filter(([key]) => !key.endsWith('-outline'));
  const outline = Object.entries(icons).filter(([key]) => key.endsWith('-outline'));

  let selectedType = 'fill';
  let filter = '';

  $: selectedList = (selectedType === 'fill' ? fill : outline).filter(([key]) => key.includes(filter));

  function clearFilter() {
    filter = '';
  }

  async function copy(text: string, element: HTMLElement) {
    try {
      await navigator.clipboard.writeText(text);
      if (element.innerHTML !== '📋') {
        const original = element.innerHTML;
        element.innerHTML = '📋';
        setTimeout(() => {
          element.innerHTML = original;
        }, 1000);
      }
    } catch {
      console.log(`failed to copy ${text}`);
    }
  }
</script>

<div class="main">
  <div class="header">
    <div>icons from <a href="https://github.com/akveo/eva-icons">eva-icons</a></div>
    <span>click icon to copy name</span>
    <div class="controls">
      <div class="filter">
        <input type="text" placeholder="filter..." bind:value={filter} />
        <button on:click={clearFilter}>clear</button>
      </div>
      <div class="type-selection">
        <label><input type="radio" value="fill" bind:group={selectedType} />Fill</label>
        <label><input type="radio" value="outline" bind:group={selectedType} />Outline</label>
      </div>
    </div>
  </div>
  <div class="icons">
    {#each selectedList as [name, data]}
      <button
        type="button"
        class="icon-container"
        title="{name}"
        on:click={(event) => copy(name, event.currentTarget)}
        aria-label="copy to clipboard"
      >
        <i class="{data.attrs.class}"></i>
      </button>
    {/each}
  </div>
</div>

<style>
  :root {
    --background-color: #242424;
    --text-color: #7D99B8;
    --text-color-alternate: #fff;
    --border-color: #2D3339;
    --hover-background-color: #292929;
    --hover-border-color: #2f383c;
    --active-background-color: #262626;
  }

  @media (prefers-color-scheme: light) {
    :root {
      --background-color: #f5f5f5;
      --text-color: #5d7998;
      --text-color-alternate: #fff;
      --border-color: #abc9e8;
      --hover-background-color: #f2f2f2;
      --hover-border-color: #9db9d8;
      --active-background-color: #fafafa;
    }
  }

  button {
    all: unset;
    display: inline-block;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: transparent;
    color: var(--text-color);
    padding: 0 0.5rem;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s, border-color 0.2s;

    &:hover {
      background-color: var(--hover-background-color);
      border-color: var(--hover-border-color);
    }

    &:active {
      background-color: var(--active-background-color);
    }
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    place-content: center;
    font-size: 20px;

    .controls {
      display: flex;
      flex-wrap: wrap;
      place-content: center;
      gap: 2rem 1rem;

      .filter {
        display: flex;

        input {
          border-radius: 5px;
        }

        button {
          color: var(--text-color-alternate);
          background-color: #436488;

          &:hover {
            color: var(--text-color-alternate);
            background-color: #537498;
          }

          &:active {
            color: var(--text-color-alternate);
            background-color: #436488;
          }
        }
      }
    }

    .type-selection {
      display: flex;
      gap: 0.5rem;

      label,
      input {
        cursor: pointer;
        user-select: none;
      }
    }
  }

  .icons {
    width: 100%;
    display: flex;
    place-content: center;
    flex-wrap: wrap;
    gap: 12px;

    .icon-container {
      display: flex;
      place-content: center;
      align-items: center;
      width: 72px;
      height: 88px;

      i {
        font-size: 32px;
      }
    }
  }
</style>
