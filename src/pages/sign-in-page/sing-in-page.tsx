import css from "./_sign-in-page.module.scss";

import { SignInForm } from "@/features/authentication/sign-in";

import { IMAGES_LIGHT } from "@/assets";

export default function SignInPage() {
  return (
    <div className={css.signInPage}>
      <div className={css.signInHeader}>
        <img src={IMAGES_LIGHT.logo} />
        <span> Clean Shelving</span>
      </div>
      <SignInForm />
    </div>
  );
}
