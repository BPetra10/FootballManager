import FormCard from "../../common/Form/FormCard";

import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import ErrorAlert from "../../common/ErrorAlert/ErrorAlert";

function LeagueForm({ form }) {

    const title = form.isEditMode
        ? "Edit League"
        : "Create League";

    const subtitle = form.isEditMode
        ? "Update the league information."
        : "Create a new football league.";

    const buttonText = form.isEditMode
        ? "Save Changes"
        : "Create League";

    return (

        <FormCard
            title={title}
            subtitle={subtitle}
            hideHeader={!!form.successMessage}
        >

            {

                form.successMessage ? (

                    <div className="form-success">

                        <h2>✓</h2>

                        <p>

                            {form.successMessage}

                        </p>

                    </div>

                ) : (

                    <form
                        className="form"
                        onSubmit={form.handleSubmit}
                    >

                        <ErrorAlert
                            message={form.generalError}
                        />

                        <Input
                            label="League Name"
                            name="name"
                            value={form.formData.name}
                            onChange={form.handleChange}
                            placeholder="Premier League"
                            error={form.errors.name}
                        />

                        <Input
                            label="Country"
                            name="country"
                            value={form.formData.country}
                            onChange={form.handleChange}
                            placeholder="England"
                            error={form.errors.country}
                        />

                        <Input
                            label="Maximum Teams"
                            name="maxTeams"
                            type="number"
                            value={form.formData.maxTeams}
                            onChange={form.handleChange}
                            placeholder="20"
                            error={form.errors.maxTeams}
                        />

                        <Button
                            type="submit"
                            variant="filled"
                        >

                            {buttonText}

                        </Button>

                    </form>

                )

            }

        </FormCard>

    );

}

export default LeagueForm;