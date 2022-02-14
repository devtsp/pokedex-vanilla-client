export const body = `		<div id="viewport" class="vw-100 vh-100 d-flex flex-column">
<!-- INFO CARD -->
<div
  id="pokemon-info"
  class="position-absolute top-50 start-50 translate-middle rounded rounded-3 visually-hidden"
>
  <div class="d-flex flex-column align-items-stretch">
    <!-- TOPBAR -->
    <div class="top-bar d-flex align-items-center">
      <div class="flex-grow-1 fs-5 py-1">
        <h4 id="name" class="d-inline ps-3 m-0">Pokemon</h4>
        <span id="type" class="d-inline align-bottom px-2">-</span>
      </div>
      <span class="px-2">
        <i
          id="close-info"
          class="bi bi-x fs-3"
          role="close"
          aria-labe="close"
        ></i>
      </span>
    </div>

    <!-- CONTENT -->
    <div class="d-flex align-items-center justify-content-center">
      <div
        class="d-inline-flex flex-column justify-content-center align-items-midle"
      >
        <div class="d-flex justify-content-center">
          <img id="main-pic" alt="Pokeball" />
        </div>
        <p
          id="flavor-text"
          class="text-center lh-1 m-3 p-2 fst-italic text-break"
        ></p>
      </div>
      <div id="info-container" class="px-4 py-3 card-text">
        <div class="info-field">
          <h6 class="m-0 mb-1">Abilities</h6>
          <p id="abilities" class="lh-1">-</p>
        </div>
        <div class="info-field">
          <h6 class="m-0 mb-1">Evolves from</h6>
          <p id="evolves-from" class="lh-1 mb-2 text-nowrap">-</p>
        </div>
        <div class="info-field">
          <h6 class="m-0 mb-1">Evolves to</h6>
          <p id="evolves-to" class="lh-1 mb-2">-</p>
        </div>
        <div class="info-field">
          <h6 class="m-0 mb-1">Habitat</h6>
          <p id="habitat" class="lh-1 mb-2">-</p>
        </div>
        <div class="info-field">
          <h6 class="m-0 mb-1">Shape</h6>
          <p id="shape" class="lh-1 mb-2">-</p>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- MAIN NAV -->
<nav id="main-nav" class="d-flex justify-content-center bg-dark-blue">
  <form class="d-flex align-items-center h-100">
    <div class="position-relative" style="height: 30px">
      <input
        name="search"
        id="search-pokemon"
        type="text"
        placeholder="Search Pokemon"
        aria-label="Search Pokemon"
        class="h-100 border border-0 ps-3"
        required
      />
      <button
        aria-label="search"
        role="search"
        class="position-absolute end-0 top-50 translate-middle-y"
      >
        <i class="bi bi-search h-100 px-1"></i>
      </button>
    </div>
  </form>
</nav>

<!-- MAIN -->
<main
  class="d-flex flex-column flex-fill justify-content-center align-items-center bg-light-yellow"
>
  <div id="error-msg" class="alert-danger"></div>

  <!-- PAGINATION NAV -->
  <nav id="pagination">
    <ul
      class="text-black h-100 list-unstyled m-0 d-flex justify-content-center align-items-center"
    >
      <li class="px-3">
        <a
          id="previous-page"
          href="#"
          class="text-decoration-none text-black fs-1"
          role="next-page"
          aria-label="next-page"
        >
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>
      <li>
        <div
          id="random-pokemon"
          class="d-flex justify-content-center align-items-center position-relative"
        >
          <img
            id="pokeball"
            src="img/Pokeball.png"
            alt="random-pokemon"
          />
          <i
            id="shuffle-icon"
            class="bi bi-question-circle position-absolute top-50 start-50 translate-middle"
          ></i>
        </div>
      </li>
      <li class="px-3">
        <a
          id="next-page"
          href="#"
          class="text-decoration-none text-black fs-1"
          role="next-page"
          aria-label="next-page"
        >
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>

  <!-- CONTENT -->
  <section>
    <div id="index">
      <div class="row g-0">
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card">
            <img class="img-fluid" />
            <span>Pokemon</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<!-- FOOTER -->
<footer>
  <ul
    class="m-0 p-1 d-flex justify-content-center align-items-center list-unstyled text-center bg-dark-blue"
  >
    <li class="me-5">
      <a href="https://pokeapi.co/" data-cy="api-link">
        <img src="img/pokeapi.png" alt="PokeApi" class="img-fluid" />
      </a>
    </li>
    <li>
      <a
        href="https://github.com/devtsp/pokedex"
        class="d-inline-flex align-items-center justify-content-center text-decoration-none text-white"
        data-cy="source-code-link"
      >
        <i class="bi bi-github fs-4" aria-label="Github"></i>
        <span class="ps-2">Source Code</span>
      </a>
    </li>
  </ul>
</footer>
</div>

<script
src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
crossorigin="anonymous"
></script>
<script src="js/main.js" type="module"></script>`;
