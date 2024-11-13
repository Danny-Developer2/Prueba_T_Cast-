using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class VehicleCreateDto {
    [Required(ErrorMessage = "El modelo del vehículo es requerido.")]
    [MaxLength(100, ErrorMessage = "La longitud máxima del modelo del vehículo es 100 caracteres.")]
    public string? Model { get; set; } = null;

    [Required(ErrorMessage = "El año del vehículo es requerido.")]
    public int? Year { get; set; } = null;

    [Required(ErrorMessage = "El color del vehículo es requerido.")]
    public string? Color { get; set; } = null;

    [Required(ErrorMessage = "La marca del vehículo es requerida.")]
    public OptionDto Brand { get; set; } = null!;

    [Required(ErrorMessage = "Las fotos del vehículo son requeridas.")]
    public List<PhotoDto> Photos { get; set; } = [];
}
