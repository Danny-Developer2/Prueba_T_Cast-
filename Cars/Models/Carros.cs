using System; 

namespace Carros.Models
{
    public class Vehicle 
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Model { get; set; } = string.Empty;
        public string Placas { get; set; } = string.Empty;

        public string Doors { get; set; }  = string.Empty;

        public ICollection<Modelos> Modelos { get; set; } = new List<Modelos>();

        public ICollection<Image> Images { get; set; } = new List<Image>();
    }
}