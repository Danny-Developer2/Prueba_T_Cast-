using Carros.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Vehicles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VehicleController(ApplicationDbContext context)
        {
            _context = context;
        }

        
        [HttpPost("{vehicleId}/images")]
        public async Task<IActionResult> PostImage(Guid vehicleId, [FromBody] Image image)
        {
            var vehicle = await _context.Vehicles.FindAsync(vehicleId);
            if (vehicle == null)
            {
                return NotFound();
            }

            image.VehicleId = vehicleId; 
            _context.Images.Add(image);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetImage), new { id = image.Id }, image);
        }
        
        
        [HttpGet("{vehicleId}/images")]
        public async Task<ActionResult<IEnumerable<Image>>> GetImages(Guid vehicleId)
        {
            var vehicle = await _context.Vehicles.FindAsync(vehicleId);
            if (vehicle == null)
            {
                return NotFound();
            }

            return await _context.Images.Where(i => i.VehicleId == vehicleId).ToListAsync();
        }

      
        [HttpGet("images/{id}")]
        public async Task<ActionResult<Image>> GetImage(Guid id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            return image;
        }

        
        [HttpPost]
        public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVehicle), new { id = vehicle.Id }, vehicle);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(Guid id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            var vehicles = await _context.Vehicles
                .Include(v => v.Images) 
                .ToListAsync(); 

            return vehicle;
        }

        
        [HttpDelete("{vehicleId}")]
        public async Task<IActionResult> DeleteVehicle(Guid vehicleId)
        {
            var vehicle = await _context.Vehicles.Include(v => v.Images).FirstOrDefaultAsync(v => v.Id == vehicleId);
            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Images.RemoveRange(vehicle.Images); 
            _context.Vehicles.Remove(vehicle); 
            await _context.SaveChangesAsync();

            return NoContent();
        }

     
        [HttpDelete("{vehicleId}/images/{imageId}")]
        public async Task<IActionResult> DeleteImage(Guid vehicleId, Guid imageId)
        {
            var image = await _context.Images.FirstOrDefaultAsync(i => i.Id == imageId && i.VehicleId == vehicleId);
            if (image == null)
            {
                return NotFound();
            }

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [HttpPut("{vehicleId}")]
        public async Task<IActionResult> UpdateVehicle(Guid vehicleId, [FromBody] Vehicle vehicle)
        {
            if (vehicleId != vehicle.Id)
            {
                return BadRequest();
            }

            var existingVehicle = await _context.Vehicles.FindAsync(vehicleId);
            if (existingVehicle == null)
            {
                return NotFound();
            }

            existingVehicle.Model = vehicle.Model;
            existingVehicle.Placas = vehicle.Placas;
            existingVehicle.Doors = vehicle.Doors;
            

            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [HttpPut("{vehicleId}/images/{imageId}")]
public async Task<IActionResult> UpdateImage(Guid vehicleId, Guid imageId, [FromBody] Image image)
{
    if (imageId != image.Id || vehicleId != image.VehicleId)
    {
        return BadRequest();
    }

    var existingImage = await _context.Images.FirstOrDefaultAsync(i => i.Id == imageId && i.VehicleId == vehicleId);
    if (existingImage == null)
    {
        return NotFound();
    }

    
    existingImage.Url = image.Url; 
    

    await _context.SaveChangesAsync();

    return NoContent();
}

         [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetAllVehicles()
        {
            var vehicles = await _context.Vehicles
                .Include(v => v.Images) 
                .ToListAsync(); 

            if (vehicles == null || !vehicles.Any())
            {
                return NotFound(); 
            }

            return Ok(vehicles);
        }
        [HttpGet("models")]
        public ActionResult<IEnumerable<string>> GetVehicleModels()
        {
            
            var models = _context.Vehicles.Select(v => v.Model).Distinct().ToList();

            if (models == null || !models.Any())
            {
                return NotFound("No se encontraron modelos.");
            }

            return Ok(models);
        }
    

    }
}
