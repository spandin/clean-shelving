import css from "./_sign-up-page.module.scss";

import { SignUpForm } from "@/features/authentication/sign-up";

import { IMAGES_LIGHT } from "@/assets";

export default function SignUpPage() {
  return (
    <div className={css.signUpPage}>
      <div className={css.signUpHeader}>
        <img src={IMAGES_LIGHT.logo} />
        <span> Clean Shelving</span>
      </div>
      <SignUpForm />
    </div>
  );
}
