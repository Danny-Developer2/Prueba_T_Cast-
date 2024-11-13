using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carros.Models
{
public class Image
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string Url { get; set; } = string.Empty;

    [Required]
    public Guid VehicleId { get; set; }  


}


}
