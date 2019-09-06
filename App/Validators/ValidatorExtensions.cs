using FluentValidation;

namespace App.Validators
{
    public static class ValidatorExtensions
    {
        //crates a custom rule for password validations
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T,string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty().MinimumLength(6).WithMessage("Password must be at least 6 characters").Matches("[A-Z]")
                .WithMessage("Password must contain 1 uppercase letter").Matches("[a-z]")
                .WithMessage("Password must have atleast one lowercase character").Matches("[0-9]")
                .WithMessage("Password must contain a number").Matches("[^a-zA-Z0-9]")
                .WithMessage("Password must contain a special character");

                return options;
        }
    }
}