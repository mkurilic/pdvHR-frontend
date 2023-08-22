<template>
    <div class="register">
        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
                <div class="in-left">
                    <div class="card border-info mb-3">
                        <div class="card-body">
                            <form @submit.prevent="register">
                                <div v-if="errorMessage" class="alert alert-danger">
                                    <strong>Ups!</strong>
                                    {{ errorMessage }}
                                </div>
                                <div class="form-group col-md-12">
                                    <label for="emailField">Korisničko ime:</label>
                                    <input v-model="username" type="text" class="form-control" id="nameField" placeholder="Upišite korisničko ime" required>
                                </div>
                                <div class="form-group col-md-12">
                                    <label for="confirmPasswordField">E-mail:</label>
                                    <input v-model="email" type="email" class="form-control" id="emailField" placeholder="Upisite email" required>
                                </div>
                                <div class="form-group col-md-12">
                                    <label for="passwordField">Lozinka:</label>
                                    <input v-model="password" type="password" class="form-control" id="passwordField" placeholder="Upišite lozinku" required>
                                </div>
                                <div class="form-group col-md-12">
                                    <label for="confirmPasswordField">Potvrda lozinke:</label>
                                    <input v-model="passwordConfirmation" type="password" class="form-control" id="confirmPasswordField" placeholder="Potvrdite lozinku" required>
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
import { Auth } from '@/services';
export default {
    
    data() {
        return {
            errorMessage: '',
            username:'',
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    },
    methods: {
        async register() {
            try {
                let success = await Auth.register(this.username, this.email, this.password);
                console.log("Rezultat registracije ", success);

                if (success == true) {
                    this.$router.push({ name: 'home' });
            }} catch (error) {
                console.error("Greška prilikom registrirajse() ", error);
                    if (error.response === 11000) {
          this.errorMessage = "Korisnik već postoji.";
        } else {
          this.errorMessage = "Registracija nije uspijela: Pokušaj ponovno.";
        }
        throw error;
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
    padding-top: 50px;
}
</style>