export const body = `
<div id="viewport" class="vw-100 vh-100 d-flex flex-column">
  <!-- POKEMON INFO ________________________________________-->
  <div
    data-cy="pokemon-info"
    id="pokemon-info"
    class="position-absolute top-50 start-50 translate-middle rounded rounded-3 visually-hidden"
  >
    <div class="d-flex flex-column align-items-stretch">
      <!-- INFO TOPBAR -->
      <div class="top-bar d-flex align-items-center">
        <div class="flex-grow-1 fs-5 py-1">
          <h4 data-cy="name" id="name" class="d-inline ps-3 m-0">
            Pokemon
          </h4>
          <span id="type" class="d-inline align-bottom px-2">-</span>
        </div>
        <span class="px-2">
          <i
            data-cy="close-info"
            id="close-info"
            class="bi bi-x fs-3"
            role="close"
            aria-labe="close"
          ></i>
        </span>
      </div>
      <!-- INFO CONTENT -->
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
            <p
              data-cy="evolves-from"
              id="evolves-from"
              class="lh-1 mb-2 text-nowrap"
            >
              -
            </p>
          </div>
          <div class="info-field">
            <h6 class="m-0 mb-1">Evolves to</h6>
            <p data-cy="evolves-to" id="evolves-to" class="lh-1 mb-2">-</p>
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
  <!-- SEARCH BAR _____________________________________________________ -->
  <nav
    data-cy="search-bar"
    id="main-nav"
    class="d-flex justify-content-center bg-dark-blue"
  >
    <form data-cy="nav-search-form" class="d-flex align-items-center h-100">
      <div class="position-relative" style="height: 30px">
        <input
          data-cy="search-input"
          name="search"
          id="search-pokemon"
          type="text"
          placeholder="Search Pokemon"
          aria-label="Search Pokemon"
          class="h-100 border border-0 ps-3"
          required
        />
        <button
          type="submit"
          aria-label="search"
          role="search"
          class="position-absolute end-0 top-50 translate-middle-y"
        >
          <i class="bi bi-search h-100 px-1"></i>
        </button>
      </div>
    </form>
  </nav>

  <!-- INDEX -->
  <main
    class="d-flex flex-column flex-fill justify-content-center align-items-center bg-light-yellow"
  >
    <!-- LOADING SPINNER -->
    <div
      data-cy="loading"
      id="loading"
      class="position-absolute d-flex align-items-center justify-content-center w-100 h-100 top-0 start-0 visually-hidden"
    >
      <div class="text-center">
        <div class="spinner-border text-light mb-2" role="status">
          <span class="sr-only"></span>
        </div>
        <div id="loading-msg">Loading</div>
      </div>
    </div>

    <div data-cy="error-msg" id="error-msg" class="alert-danger"></div>

    <!-- PAGINATION NAV -->
    <nav data-cy="pagination-controls" id="pagination" data-page="-1">
      <ul
        class="text-black h-100 list-unstyled m-0 d-flex justify-content-center align-items-center"
      >
        <li class="px-3">
          <a
            data-page="-2"
            id="previous-page"
            href="#"
            class="text-decoration-none text-black fs-1"
            role="previous-page"
            aria-label="previous-page"
          >
            <i data-cy="previous-page" class="bi bi-chevron-left"></i>
          </a>
        </li>
        <li>
          <div
            id="random-pokemon"
            class="d-flex justify-content-center align-items-center position-relative"
          >
            <img
              id="pokeball"
              src="src/img/Pokeball.png"
              alt="random-pokemon"
            />
            <i
              data-cy="random-pokemon"
              id="shuffle-icon"
              class="bi bi-question-circle position-absolute top-50 start-50 translate-middle"
            ></i>
          </div>
        </li>
        <li class="px-3">
          <a
            data-page="0"
            id="next-page"
            href="#"
            class="text-decoration-none text-black fs-1"
            role="next-page"
            aria-label="next-page"
          >
            <i data-cy="next-page" class="bi bi-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>

    <!-- CONTENT -->
    <div data-cy="index" id="index" class="container w-75">
      <div class="row g-0">
        <div class="col">
          <div class="poke-card text-center">
            <span data-cy="first-index-pokemon">Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
        <div class="col">
          <div class="poke-card text-center">
            <span>Pokemon</span>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- FOOTER -->
  <footer data-cy="footer">
    <ul
      class="m-0 p-1 d-flex justify-content-center align-items-center list-unstyled text-center bg-dark-blue"
    >
      <li class="me-5">
        <a href="https://pokeapi.co/" data-cy="api-link">
          <img src="src/img/pokeapi.png" alt="PokeApi" class="img-fluid" />
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
<script src="src/js/index.js" type="module"></script>
`;
