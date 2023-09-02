<template>
    <app-nav-bar />
    <div class="register">
        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
                <div class="in-left">
                    <div class="card border-info mb-3">
                        <div class="card-body">
                            <form @submit.prevent="register">
                                <div v-if="errorMessage" class="alert alert-danger">
                                    {{ errorMessage }}
                                </div>
                                <div class="form-group row">
                                    <label for="emailField" class="col-sm-2 col-form-label">Korisničko ime: </label>
                                    <div class="col-sm-10"></div>
                                    <input v-model="username" type="text" class="border border-black/30 rounded-md w-full px-4 py-2" id="usernameField" placeholder="Upišite korisničko ime" required>
                                </div>
                                <div class="form-group row">
                                    <label for="nameField" class="col-sm-2 col-form-label">Ime: </label>
                                    <div class="col-sm-10"></div><input v-model="firstname" type="text" class="border border-black/30 rounded-md w-full px-4 py-2" id="nameField" placeholder="Upišite svoje ime" required>
                                </div>
                                <div class="form-group row">
                                    <label for="confirmPasswordField" class="col-sm-2 col-form-label">E-mail: </label>
                                    <div class="col-sm-10"></div><input v-model="email" type="email" class="border border-black/30 rounded-md w-full px-4 py-2" id="emailField" placeholder="Upišite email" required>
                                </div>
                                <div class="form-group row">
                                    <label for="passwordField" class="col-sm-2 col-form-label">Lozinka:</label>
                                    <div class="col-sm-10"></div><input v-model="password" type="password" class="border border-black/30 rounded-md w-full px-4 py-2" id="passwordField" placeholder="Upišite lozinku" required>
                                </div>
                                <div class="form-group row">
                                    <label for="confirmPasswordField" class="col-sm-2 col-form-label">Potvrda lozinke: </label>
                                    <div class="col-sm-10"></div><input v-model="passwordConfirmation" type="password" class="border border-black/30 rounded-md w-full px-4 py-2" id="confirmPasswordField" placeholder="Potvrdite lozinku" required>
                                </div>
                                <div v-if="password != passwordConfirmation" class="alert alert-danger" role="alert">Lozinke nisu jednake.</div>
                                <div class="text-center">
                                    <button v-if="password === passwordConfirmation" type="submit" class="button">Registriraj se</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/partials/NavBar.vue';
import { Auth } from '@/services';
export default {
    
    data() {
        return {
            errorMessage: '',
            username:'',
            firstname: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    }, components: {
      'app-nav-bar':NavBar
  },
    methods: {
        async register() {
            try {
                let success = await Auth.register(this.username, this.firstname, this.email, this.password);
                if (success == true) {
                    this.$router.push({ name: 'home' });
            }} catch (error) {
                console.error("Greška prilikom registriracije ", error);
                    if (error.response === 11000) {
                        this.errorMessage = "Korisnik već postoji.";
                    } else {
                        this.errorMessage = "Registracija nije uspijela: Pokušaj ponovno.";
                    }
      }
    
    }
  }
}
</script>

<style lang="scss">
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
}
@-webkit-keyframes fadeInLeft {
    from {
        opacity:0;
        -webkit-transform: translatex(-10px);
        -moz-transform: translatex(-10px);
        -o-transform: translatex(-10px);
        transform: translatex(-10px);
    }
    to {
        opacity:1;
        -webkit-transform: translatex(0);
        -moz-transform: translatex(0);
        -o-transform: translatex(0);
        transform: translatex(0);
    }
}
@-moz-keyframes fadeInLeft {
    from {
        opacity:0;
        -webkit-transform: translatex(-10px);
        -moz-transform: translatex(-10px);
        -o-transform: translatex(-10px);
        transform: translatex(-10px);
    }
    to {
        opacity:1;
        -webkit-transform: translatex(0);
        -moz-transform: translatex(0);
        -o-transform: translatex(0);
        transform: translatex(0);
    }
}
@keyframes fadeInLeft {
    from {
        opacity:0;
        -webkit-transform: translatex(-100px);
        -moz-transform: translatex(-100px);
        -o-transform: translatex(-100px);
        transform: translatex(-100px);
    }
    to {
        opacity:1;
        -webkit-transform: translatex(0);
        -moz-transform: translatex(0);
        -o-transform: translatex(0);
        transform: translatex(0);
    }
}
.in-left {
    -webkit-animation-name: fadeInLeft;
    -moz-animation-name: fadeInLeft;
    -o-animation-name: fadeInLeft;
    animation-name: fadeInLeft;
    -webkit-animation-fill-mode: both;
    -moz-animation-fill-mode: both;
    -o-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.3s;
    -moz-animation-duration: 0.3s;
    -o-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-delay: 0.3s;
    -moz-animation-delay: 0.3s;
    -o-animation-duration: 0.3s;
    animation-delay: 0.3s;
}
.register{
    padding-top: 100px;
}
</style>