<script>
  import { onMount } from 'svelte';
  export let name;
  export let numberCodes;
  export let dark;

  let selectedCode = "+62";
  let phoneNumber;
  let error;
  let toggleIcon = 'fa-moon';

  const filterNumber = () => {
    phoneNumber = phoneNumber.replace(/\D+/g, "");
  }
  
  const toggleDark = (e) => {
    if (!dark) {
      dark = true;
      localStorage.setItem('theme', 'dark');
    } else {
      dark = false;
      localStorage.setItem('theme', 'light');
    }
    applyTheme(dark);
  }
  
  const applyTheme = (isDark) => {
    let body = document.getElementsByTagName('html')[0];
    if (isDark) {
      toggleIcon = 'fa-sun';
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      toggleIcon = 'fa-moon';
      body.classList.add("light");
      body.classList.remove("dark");
    }
  }
  
  const submit = (e) => {
    if (e) e.preventDefault();
    const code = (selectedCode || '+62').replace(/^\+/gi, '');
    phoneNumber = phoneNumber && phoneNumber.toString();
    if (!phoneNumber) {
      error = 'Tolong masukan nomornya!';
      return;
    } else if (phoneNumber.length <= 5) {
      error = 'Nomor terlalu sedikit!';
      return;
    }
    const number = `${code}${phoneNumber.replace(/[^0-9]-+/gi, '').replace(new RegExp(`^0|^${code}|^\\${code}`, 'gi'), '')}`;
    if (!number) {
      error = 'Please use a valid phoneNumber number';
      return;
    }
    window.location.href = `https://wa.me/${number}`;
  }

  onMount(() => {
    applyTheme(dark);
  });

</script>

<button class="animate-pulse absolute top-0 right-0 bg-white-500 text-blue-300 p-3 text-2xl m-1 rounded hover:bg-blue-50 dark:hover:bg-gray-800" on:click={toggleDark}><i class={`fas ${toggleIcon}`}></i></button>

<main class="pr-2 pl-2 max-w-xl m-auto mx-auto">
  <section class="mt-32">
    <h1 class="text-red-500 text-center text-5xl lg:text-6xl uppercase leading-relaxed font-thin">
      {name}
    </h1>
    <p class="text-gray-700 dark:text-gray-300 text-center pb-6 pt-3">
      Chat nomor WhatsApp tanpa ribet simpan nomor kontak!
    </p>

    { #if error }
      <div class="border-l-4 bg-red-100 border-red-500 text-red-700 p-4 mb-2" role="alert" style={{wordWrap: 'break-word'}}>
        { error }<br/>
      </div>
    { /if }
    <div class="container items-center">
      <form class="flex dark:bg-gray-700 dark:border-gray-700 flex-col w-full p-5 px-6 pt-2 mx-auto mb-4 transition duration-500 ease-in-out transform bg-white border rounded-md" id="submit" data-action="generate">
        <div class="relative pt-3">
          <select bind:value={selectedCode} class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform rounded-md bg-gray-100 focus:border-blueGray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-2 dark:bg-gray-600 dark:text-white">
            { #each numberCodes as code }
              <option value={code.dial_code}>{code.name} ({code.dial_code})</option>
            { /each }
          </select>
        </div>
        <div class="relative pt-3">
          <input bind:value={phoneNumber} on:input={filterNumber} type="string" minLength="10" min="0" maxLength="14" autoComplete="off" placeholder="Phone number" class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-md bg-gray-100 focus:border-blueGray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-5 dark:bg-gray-600 dark:text-white" />
        </div>
      </form>
      <div class="relative">
        <button on:click={submit} class="w-full py-3 text-base text-white transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none bg-green-300 border-green-300 hover:bg-green-500">Go!</button>
      </div>
    </div>
  </section>
</main>

<footer class="mt-10 mb-20 text-sm text-center dark:text-gray-300">
  <p>
    Made with ♥ from <a class="border-b border-black dark:border-gray-400" href="https://bayun.id" target="_blank" rel="noreferrer">BayuN</a>
    &bull; <a class="border-b border-black dark:border-gray-400" href="https://github.com/bayungrh">GitHub</a>
  </p>
</footer>
  
<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
